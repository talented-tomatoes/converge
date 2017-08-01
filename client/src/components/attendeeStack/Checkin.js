import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Button, Content, Drawer, Item, Toast, Card, CardItem, Body, Left, Badge, Icon, Spinner, Grid, Col, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { FileUpload } from 'NativeModules';
import axios from 'axios';
import sha1 from 'sha1';
import Camera from 'react-native-camera';
import SideBar from './Sidebar';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';
import Config from '../../../../config/config.js'
import uploadImage from '../registerStack/helpers/uploadImage';
import randomColor from '../helpers/randomColor';

class Checkin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      isLoading: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.randomColor = randomColor();
  }

  static navigationOptions = {
    title: 'Camera'
  };

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  openDrawer() {
    this.drawer._root.open();
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  capturePic() {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({isLoading: true});
        let options = uploadImage(response.data);
        const USER_ID = this.props.user.id;
        const SERVER_URL = Config.server.url || 'http://localhost:3000';
        axios.post(options.url, options.body)
        .then(response => {
           let reqObj = {
            checkinpicurl: response.data.secure_url
           };
           //console.log('sending axios to server,userid=', USER_ID);
           return axios.post(SERVER_URL + `api/users/${USER_ID}/checkin`, reqObj)
        })
        .then(response => {
          if (response.data !== 'Success') {
            //console.log('Checkin Failed!');
            this.setState({isLoading: false});
            Toast.show({
              text: 'Check-in Failed! Please try again.',
              position: 'bottom',
              buttonText: 'Okay',
              type: 'danger'
            });
          } else {
            this.setState({isLoading: false});
            Toast.show({
              text: 'Check-in Successful!',
              position: 'bottom',
              type: 'success',
              duration: 500
            });
            this.props.navigation.navigate('Home');
          }
        })
        .catch(err => {
          console.log('Error: ', err);
          this.setState({isLoading: false});
          Toast.show({
            text: 'Check-in Failed! Please try again.',
            position: 'bottom',
            buttonText: 'Okay',
            type: 'danger'
          });
        })
      }
      })
    }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Check In"
        />
        <Content style={{padding: 10}}>
          <Card style={{flex: 0}}>
            <Image source={{uri: this.props.conference.banner}} style={{height: 200, flex: 1}}/>
            <CardItem style={{paddingTop: 15}}>
              <Body>
                <Left>
                  {this.state.isLoading
                ? (<Spinner color={this.randomColor} />)
                :  (<Left>
                  <TouchableOpacity light onPress={() => this.capturePic()}>
                      <Thumbnail large source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}} />
                    </TouchableOpacity>

                    </Left>)
                  }
                </Left>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                  <Text> Bye-bye long check-in lines! Take a selfie to speed up the process and skip the check-in line. </Text>
                </Left>
              </Body>
            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
          </Card>
        </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    conference: state.attendeeReducer,
  }
}

export default connect(mapStateToProps)(Checkin);

