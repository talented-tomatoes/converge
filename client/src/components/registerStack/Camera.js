import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Button } from 'native-base';

import Camera from 'react-native-camera';

export default class CameraScreen extends Component {
  static navigationOptions = {
    title: 'Camera',
  };
  constructor(props) {
    super(props);
    this.state = {
      picURI: ''
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.setState({
          picURI: data.mediaUri
        }, this.props.navigation.navigate('Register: ', {picURI: this.state.picURI}));

        console.log(data)
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          type={Camera.constants.Type.front}
          >
          <Button success full onPress={this.takePicture.bind(this)}>
            <Text>[CAPTURE]</Text>
          </Button>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
