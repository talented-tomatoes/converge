import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class Concierge extends Component {
  static navigationOptions = {
    tabBarLabel: 'Concierge',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  //This is our main app
  render() {
    return (
      <Text>Concierge</Text>
    );
  }
}

AppRegistry.registerComponent('converge', () => Concierge);
