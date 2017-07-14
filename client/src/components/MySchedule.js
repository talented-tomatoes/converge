import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';


export default class MySchedule extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Schedule',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  //This is our main app
  render() {

    return (

      // <View style={{flex: 1, flexDirection: 'column'}}>
      //   <View style={{width: 50, backgroundColor: 'powderblue'}} />
      //   </View>
      <Text style={styles.baseText}>
        something
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
      </Text>
      

    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('converge', () => MySchedule);
