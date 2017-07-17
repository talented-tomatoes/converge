import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Auth from './Auth';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };
  constructor(props) {
    super(props);
  }

  //This is our main app
  render() {
    setTimeout(()=> {this.props.navigation.navigate('Auth')}, 700)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'darkcyan'}}>
        <Text style={{color: 'lightgrey', fontSize: 50, fontWeight: 'bold', fontFamily: 'Verdana'}}>Converge</Text>
      </View>
    );
  }
}

