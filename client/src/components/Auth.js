import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Container, Content, Button, Toast, Header, Footer } from 'native-base';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';
import { setUser} from './actions/actions';
import Config from '../../../config/config';

import axios from 'axios';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorized: false,
    }
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  validateUserType() {
    if (this.state.isAuthorized === false) {
        const SERVER_URL = Config.server.url || 'http://localhost:3000';
        this.props.dispatch(setUser(this.state.user));
        let url = SERVER_URL + 'api/getUserID/' + this.state.user.id;
        axios.get(url)
          .then(response => {
            if (response.data.length === 0) {
              this.props.navigation.navigate('RegisterStack');
            } else if (response.data.user_type === 'host') {
              this.props.navigation.navigate('AdminStack');
            } else if (response.data.user_type === 'attendee') {
              this.props.navigation.navigate('AttendeeStack');
            } else {
              this._signOut();
              Toast.show({
                text: 'Please try logging in again',
                position: 'bottom',
                buttonText: 'X',
                type: 'warning',
                duration: 2000
              });
              this.setState({
                isAuthorized: false
              });
            }
          })
          .catch(error => {
            console.log('error redirecting user: ', error);
          })


    }
      this.setState({
        isAuthorized: true
      })



  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '640815180371-mss8fe2hr61pg9hsh8uprnbgg8n6i6eb.apps.googleusercontent.com',
      });

      const user = await GoogleSignin.currentUserAsync();
      this.setState({user}, () => this.validateUserType());

    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({user: user}, () => this.validateUserType());
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

  render() {
      return (
        <Image source={require('../../../assets/splashPage.png')} style={styles.background} resizeMode="contain">
        <Header style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
        <Content />
        <Footer style={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Auto} onPress={this._signIn.bind(this)}/>
        </Footer>
        </Image>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  }
}

export default connect(mapStateToProps)(Auth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'lightgrey'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: null,
    width: null,
    backgroundColor: 'white',
    resizeMode: 'stretch',
    padding: 10
  },
});
