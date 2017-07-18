import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';


export default class MapEditPage extends Component {
  static navigationOptions = {
    title: 'Map'
  }

  constructor(props) {
    super(props);


  }

  render() {

    return (
        <Text> current map and options to upload a new one will go here </Text>
    );

  }
}