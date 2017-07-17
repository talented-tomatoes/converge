import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Container, Content, Button } from 'native-base';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Auth extends Component {
  static navigationOptions = {
    title: 'Log In',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '640815180371-mss8fe2hr61pg9hsh8uprnbgg8n6i6eb.apps.googleusercontent.com',
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
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

  //This is our main app
  render() {
    if (!this.state.user) {
      return (
        <Container style={{backgroundColor: 'lightgrey'}}>
          <View style={styles.container}>
            <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Auto} onPress={this._signIn.bind(this)}/>
          </View>
        </Container>
      );
    }

    if (this.state.user) {
      return (
        <Container style={{backgroundColor: 'lightgrey'}}>
          <View style={styles.container}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
            <Button rounded primary onPress={() => {this.props.navigation.navigate('AttendeeStack', this.state.user)}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>I'm Already Registered</Text>
            </Button>
            <Button rounded primary onPress={() => {this.props.navigation.navigate('RegisterStack')}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>I Need To Register</Text>
            </Button>
            <TouchableOpacity onPress={() => {this._signOut(); }}>
              <View style={{marginTop: 50}}>
                <Text>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      );
    }



  }
}

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
});
