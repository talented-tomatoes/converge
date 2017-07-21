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
import { Button, Content, Drawer, Item } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { FileUpload } from 'NativeModules';
import axios from 'axios';
import sha1 from 'sha1';
import Camera from 'react-native-camera';
import SideBar from './Sidebar';
import AttendeeHeader from './AttendeeHeader.js';
import AttendeeFooter from './AttendeeFooter.js';
import Config from '../../../../config/config.js'

class Checkin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      picture: ''
    };
    this.openDrawer = this.openDrawer.bind(this);
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
        let cloud_name = Config.cloudinary.cloud_name;
        let api_secret = Config.cloudinary.api_secret;
        let url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';
        let timestamp = Date.now();
        let tags = ['pic'];
        let values = {
          file: 'data:image/png;base64,' + response.data,
          api_key: Config.cloudinary.api_key,
          timestamp: timestamp,
          tags: tags,
          signature: sha1("tags=" + tags + "&timestamp=" + timestamp + api_secret)
        };
        console.log('USER ID', this.props.user.id);
        const USER_ID = this.props.user.id;
        const SERVER_URL = Config.server.url || 'http://localhost:3000';
        axios.post(url, values)
        .then(response => {
           console.log('Response URL: ', response.data.secure_url);
           let reqObj = {
            checkinpicurl: response.data.secure_url
           };
           //console.log('sending axios to server,userid=', USER_ID);
           return axios.post(SERVER_URL + `/api/users/${USER_ID}/checkin`, reqObj)
        })
        .then(response => {
          console.log('Response', response);
        })
        .catch(err => {
          console.log('Error: ', err);
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
        <AttendeeHeader title = "Check-in" openDrawer = { this.openDrawer }/>
      	  <Content>
            <Text>Check-in</Text>
            <Item style={{margin: 5, alignSelf: 'center'}}>
              <TouchableOpacity light onPress={() => this.capturePic()}>
                <Image source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}}></Image>
              </TouchableOpacity>
            </Item>
          </Content>
        <AttendeeFooter/>
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

