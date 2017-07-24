import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { Container, Content, Button } from 'native-base';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { connect } from 'react-redux';
import { setUser } from './actions/actions';
import Config from '../../../config/config';

import axios from 'axios';

class Auth extends Component {
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

  validateUserType() {
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
        }
      })
      .catch(error => {
        console.log('error redirecting user: ', error);
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
      // this.props.dispatch(setUser(this.state.user));

    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({user: user}, () => this.validateUserType());
      // this.props.dispatch(setUser(this.state.user));

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
    // if (!this.state.user) {
      return (
        <Container style={{backgroundColor: 'lightgrey'}}>
          <View style={styles.container}>
            <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Auto} onPress={this._signIn.bind(this)}/>
            <TouchableOpacity onPress={() => {this._signOut(); }}>
              <View style={{marginTop: 50}}>
                <Text>Log out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      );
    // }

    // if (this.state.user) {
    //   return (
    //     <Container style={{backgroundColor: 'lightgrey'}}>
    //       <View style={styles.container}>
    //         <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
    //         <Button rounded primary onPress={() => {this.props.navigation.navigate('AttendeeStack', this.state.user)}}>
    //           <Text style={{fontWeight: 'bold', color: 'white'}}>I'm Already Registered</Text>
    //         </Button>
    //         <Button rounded primary onPress={() => {this.props.navigation.navigate('RegisterStack')}}>
    //           <Text style={{fontWeight: 'bold', color: 'white'}}>I Need To Register</Text>
    //         </Button>
    //       </View>
    //     </Container>
    //   );
    // }



  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
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
});
