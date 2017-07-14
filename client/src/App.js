import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';

import { TabNavigator } from 'react-navigation';
import MySchedule from './components/MySchedule';
import VenueMap from './components/VenueMap';
import Concierge from './components/Concierge';

export default class App extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  }

  //This is our main app
  render() {
    console.log('i\'m in the app');
    return (
      <View style={styles.container}>
        <Text style={{color: 'red'}}>Hello world!</Text>
      </View>
    );
  }
}

const HomeScreenNavigator = TabNavigator({
  App: { screen: App },
  MySchedule: { screen: MySchedule },
  VenueMap: { screen: VenueMap },
  Concierge: { screen: Concierge}
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    flexDirection: 'column'
  }
});

AppRegistry.registerComponent('converge', () => HomeScreenNavigator);
