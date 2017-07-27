import React, { Component } from 'react';
import { Container, Header, Button, Title, Text, Thumbnail, Left, Body, Item, List, ListItem } from 'native-base';
import {Image} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';

class ProfileSidebar extends React.Component {
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
    console.log('inside profile ProfileSidebar', this.props);
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header style={{ backgroundColor: '#428bca'}}>
          <Left style={{flexDirection: 'row', alignItems: 'center' }}>
          <Thumbnail small source={{uri: this.props.user.avatarUrl}} />
          <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 20}}> {this.props.user.givenName + ' ' + this.props.user.familyName} </Text>
          </Left>
        </Header>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('MyEvents')}}>
          <Title>My Events</Title>
        </Button>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('ConferenceList')}}>
          <Title>Find Events</Title>
        </Button>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('EditAttendeeProfileForm')}}>
          <Title>Edit Profile</Title>
        </Button>
        <Button rounded transparent onPress={() => {this._signOut()}}>
          <Title>Logout</Title>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(ProfileSidebar);