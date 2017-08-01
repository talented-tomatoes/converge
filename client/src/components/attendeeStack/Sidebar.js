import React, { Component } from 'react';
import { Container, Header, Button, Title, Text, Thumbnail, Left, Body, Item, List, ListItem } from 'native-base';
import {Image} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import axios from 'axios';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbUser: {}
    }
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
      this.props.navigation.navigate('Auth');
    })
    .done();
  }

  componentDidMount() {
    if (!this.state.dbUser.hasOwnProperty('first_name')) {
      const SERVER_URL = Config.server.url;

      let url = SERVER_URL + 'api/users/' + this.props.user.id;
      axios.get(url)
        .then(user => {
          this.setState({
            dbUser: user.data
          })
        })
        .catch(err => {
          console.log('error getting user: ', err);
        })
    }
  }

  render() {
    console.log('sidebar props: ', this.props);
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header style={{ backgroundColor: '#428bca'}}>
          <Left style={{flexDirection: 'row', alignItems: 'center' }}>
          <Thumbnail small source={{uri: this.state.dbUser.avatar_url}} />
          <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 20}}> {this.state.dbUser.first_name + ' ' + this.state.dbUser.last_name} </Text>
          </Left>
        </Header>

        <Button rounded transparent onPress={() => {this.props.navigation.navigate('Speakers')}}>
          <Title>Speakers</Title>
        </Button>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('MasterSchedule')}}>
          <Title>Presentations</Title>
        </Button>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('Checkin')}}>
          <Title>Check-in</Title>
        </Button>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('MyEvents')}}>
          <Title>My Events</Title>
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

export default connect(mapStateToProps)(Sidebar);