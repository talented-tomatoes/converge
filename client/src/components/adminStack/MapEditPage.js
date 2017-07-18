import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';
import EventDetails from './EventDetails.js';

export default class MapEditPage extends Component {
  static navigationOptions = {
    title: 'Map'
  }

  constructor(props) {
    super(props);


  }

  render() {

    return (
        <Text> Hi </Text>
    );
  }
}