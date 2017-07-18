import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Payment extends React.Component {

  static navigationOptions = {
    title: 'Payment Details'
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View><Text>Hi Payment</Text></View>
    );
  }
}

