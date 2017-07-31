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
import { Button, Content, Drawer, Item, Toast, Card, CardItem, Body, Left, Badge, Icon, Spinner } from 'native-base';
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
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    //ImagePicker.launchCamera(options, (response) => {
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
        console.log('USER ID', this.props.user.id);
        const USER_ID = this.props.user.id;
        const SERVER_URL = Config.server.url || 'http://localhost:3000';
        axios.post(options.url, options.body)
        .then(response => {
           console.log('Response URL: ', response.data.secure_url);
           let reqObj = {
            checkinpicurl: response.data.secure_url
           };
           //console.log('sending axios to server,userid=', USER_ID);
           return axios.post(SERVER_URL + `api/users/${USER_ID}/checkin`, reqObj)
        })
        .then(response => {
          console.log('Response', response.data);
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
          <Card style={{paddingTop: 155, paddingBottom: 160}}>
            <CardItem style={{paddingTop: 15}}>
              <Body>
                <Left>
                  {this.state.isLoading 
                ? (<Spinner color='red'/>)
                :  (<Left>
                  <TouchableOpacity light onPress={() => this.capturePic()}>
                      <Image large source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}} />
                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.capturePic()} style={{position: 'absolute', left: 50, top: 50}}>
                      <Badge style={{backgroundColor: this.randomColor}}><Text><Icon name="camera" style={{fontSize: 20, color: '#fff'}}></Icon></Text></Badge>
                    </TouchableOpacity> 
                    </Left>)
                  }
                </Left>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                  <Text> Bye-bye long check-in lines! Click a picture of your face to speed up the process and skip the check-in line. </Text>
                </Left>
              </Body>
            </CardItem>
          </Card >
        </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(Checkin);

