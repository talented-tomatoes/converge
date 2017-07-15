import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Container, Content, Button } from 'native-base';

export default class Auth extends Component {
  static navigationOptions = {
    title: 'Log In',
    header: null,

  };

  //This is our main app
  render() {
    return (
      <Container style={{backgroundColor: 'lightgrey'}}>
        <View style={{flex: 1, backgroundColor: 'lightgrey', justifyContent: 'center', alignSelf: 'center'}}>
          <Button rounded primary onPress={() => {this.props.navigation.navigate('AttendeeStack')}}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>I'm Already Registered</Text>
          </Button>
          <Button rounded primary onPress={() => {this.props.navigation.navigate('RegisterStack')}}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>I Need To Register</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

