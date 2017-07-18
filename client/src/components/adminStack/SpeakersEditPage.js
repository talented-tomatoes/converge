import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';


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
        <Text> current speakers and options to edit will go here </Text>
    );
  }
}