import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class MySchedule extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Schedule',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  //This is our main app
  render() {

    return (
      <Text>My Schedule</Text>
    );
  }
}

AppRegistry.registerComponent('converge', () => MySchedule);
