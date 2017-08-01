import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image } from 'react-native';
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
      <Image source={require('../../../assets/splashPage.png')} style={styles.background} resizeMode="contain" />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: null,
    width: null,
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: 'stretch',
    padding: 10
  },
})