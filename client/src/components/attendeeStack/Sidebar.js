import React, { Component } from 'react';
import { Container, Button, Title, Text } from 'native-base';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
      this.props.navigation.navigate('Auth');
    })
    .done();
  }

  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
          <Text style={{padding: 10}}>Your Name Here</Text>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Speakers')}}>
            <Title>Speakers</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Presentations')}}>
            <Title>Presentations</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('MasterSchedule')}}>
            <Title>Event Schedule</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Checkin')}}>
            <Title>Check-in</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('MyEvents')}}>
            <Title>My Events</Title>
          </Button>
          <Button rounded transparent onPress={() => {this._signOut()}}>
            <Title>Logout</Title>
          </Button>

      </Container>
    );
  }
}
