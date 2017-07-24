import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon, Body, Thumbnail } from 'native-base';
import NewEvent from './CreateEvent.js';
import EventsList from './EventsList.js';
import DummyData from './dummy/fakeEventData.js';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// import the action
import { connect } from 'react-redux';
import { setInitialHostData, decorateUserWithDBUserID } from '../actions/actions';

import axios from 'axios';


class AdminLanding extends Component {
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


  componentDidMount() {
    console.log('Admin Landing Page mounted!');
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    let url = SERVER_URL + 'api/getUserID/' + this.props.user.id;

    axios.get(url)
      .then(response => {
        console.log('response in createEvent: ', response);
        //add userID to store
        this.props.dispatch(decorateUserWithDBUserID(response.data.id));
        console.log('after dispatch: ', this.props);
        this.setState({
          user_id: this.props.user.userID
        }, () => {console.log('user_id state changed to: ', this.state.user_id)});
        let getConferencesURL = SERVER_URL + 'api/getConferencesByHostID/' + this.props.user.userID;
        //axios get to server
        axios.get(getConferencesURL).then(response => {
          console.log('response: ', response.data);
          this.props.dispatch(setInitialHostData(response.data));
        })
      })
      .catch(err => {
        console.log('error getting host conferences: ', err);
      })

  }


  // ADMIN LANDING PAGE
  render() {
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="menu"
          title="Hosted Events"
          rightNavigation="CreateEvent"
          rightIcon="add"
        />
        <Content>
          <Button rounded transparent onPress={() => {this._signOut()}}>
            <Title>Logout</Title>
          </Button>
          <EventsList navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    data: state.adminReducer,
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(AdminLanding);