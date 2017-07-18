import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';
import EventDetails from './EventDetails.js';

export default class SpeakersEditPage extends Component {
  static navigationOptions = {
    title: 'Speakers'
  }
  constructor(props) {
    super(props);

    // this.state = {
    //   data: []
    // }

  }

  render() {

    return (
        <Text> Hi </Text>
    );
  }
}