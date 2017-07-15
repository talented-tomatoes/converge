import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text, Form, Item, Input, Label, Radio, ListItem, Separator, CheckBox, SwipeRow } from 'native-base';

import Swiper from 'react-native-swiper';
import Camera from 'react-native-camera';
import CameraScreen from './Camera';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      isAttendee: true
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>linkedIn URL</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input />
            </Item>
            <Item>
              <Button onPress={() => this.props.navigation.navigate('Camera')}>
                <Text>Take Profile Photo</Text>
              </Button>
            </Item>
          </Form>

          <Separator />


        <Text style={{alignSelf: 'center'}} note>Swipe For Host</Text>

        <Swiper showsButtons={false}>
            <Button block onPress={() => {this.props.navigation.navigate('ConferenceList')}}>
              <Text style={{fontSize: 15}}>Register as Attendee</Text>
            </Button>
          <Button block onPress={() => {this.props.navigation.navigate('CreateEvent')}}>
            <Text style={{fontSize: 15}}>Register as Host</Text>
          </Button>
        </Swiper>
        </Content>
      </Container>
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
    height: 50,
    width: 50
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