import React, { Component } from 'react';
import { Header, Container, Button, Title, Text, Thumbnail, Left, Body, Item, List, ListItem, Right } from 'native-base';
import {Image, View} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';
import Config from '../../../../../config/config.js';
import axios from 'axios';


class HostSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbUser: {}
    }
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.props.navigation.navigate('Auth');
    })
    .done();
  }

  componentDidMount() {
    const SERVER_URL = Config.server.url;

    let url = SERVER_URL + 'api/users/' + this.props.user.id;
    axios.get(url)
      .then(user => {
        console.log('user: ', user);
        this.setState({
          dbUser: user.data
        })
      })
      .catch(err => {
        console.log('error getting user: ', err);
      })
  }

  render() {
    console.log('host sidebar props: ', this.props);
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header style={{ backgroundColor: '#428bca'}}>
          <Left style={{flexDirection: 'row', alignItems: 'center' }}>
          <Thumbnail small source={{uri: this.state.dbUser.avatar_url}} />
          <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 20}}> {this.state.dbUser.first_name + ' ' + this.state.dbUser.last_name} </Text>
          </Left>
        </Header>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('EditAdminProfileForm')}}>
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

export default connect(mapStateToProps)(HostSidebar);