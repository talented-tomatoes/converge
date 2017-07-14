import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content } from 'native-base';



export default class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };

  render() {
    return (
      <View>
        <Text> Create New Events Page </Text>
        <Text> Will have a form here for inputting basic details</Text>
        </View>
    )
  }

}