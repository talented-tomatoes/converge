import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content } from 'native-base';



export default class AdminEvents extends Component {
  static navigationOptions = {
    title: "My Events",
  };

  render() {
    return (
      <View>
        <Text> Events Page </Text>
        <Text> Should have a list of Events that can be tapped to go futher </Text>
        </View>
    )
  }

}