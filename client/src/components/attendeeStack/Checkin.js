import React, { Component } from 'react';
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


import Camera from 'react-native-camera';
import SideBar from './Sidebar';
import AttendeeHeader from './AttendeeHeader.js';
import AttendeeFooter from './AttendeeFooter.js';

export default class Checkin extends Component {

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
    //let options = {};
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
        console.log(response.uri);
        let source = { uri: response.uri };
        this.setState({
          picture: source
        });

        var obj = {
          uploadUrl: 'http://localhost:3000/api/users/1/checkin',
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
          },
          fields: {
              'hello': 'world',
          },
          files: [
            {
            // name: 'one', // optional, if none then `filename` is used instead
              filename: response.fileName, // require, file name
              filepath: response.uri // require, file absolute path
              //filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
            },
          ]
        };
        console.log('FileUpload=', FileUpload);
        FileUpload.upload(obj, function(err, result) {
          console.log('upload:', err, result);
        })
      }
  });
};

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     color: '#000',
//     padding: 10,
//     margin: 40
//   }
// });
