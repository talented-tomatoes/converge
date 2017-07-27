import React, { Component } from 'react';
import { Container, Button, Title, Text, Thumbnail, Left, Body, Item, List, ListItem } from 'native-base';
import {Image} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';

class HostSidebar extends React.Component {
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
    console.log('inside profile HostSidebar');
    return (
      <Container style={{backgroundColor: 'white'}}>
        <List style={{paddingTop:25}}>
          <ListItem avatar>
            <Left>
              <Thumbnail small source={{uri: this.props.user.avatarUrl}} />
            </Left>
            <Body>
              <Text> {this.props.user.name} </Text>
            </Body>
          </ListItem>
        </List>
        <Button rounded transparent onPress={() => {this.props.navigation.navigate('Register')}}>
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
  console.log('mapStateToProps!!!');
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(HostSidebar);