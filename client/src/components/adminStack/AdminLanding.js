import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon, Body, Thumbnail } from 'native-base';
import ConferenceForm from './DetailsLanding/EditConferenceForm.js';
import EventsList from './EventsList.js';
import DummyData from './dummy/fakeEventData.js';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// import the action
import { connect } from 'react-redux';
import { setInitialHostData, decorateUserWithDBUserID, setAdminSelectedConference } from '../actions/actions';

import axios from 'axios';


class AdminLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
      this.props.navigation.navigate('Auth');
    })
    .done();
  }


  componentDidMount() {
    // setup URL for getting the user id
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    let url = SERVER_URL + 'api/getUserID/' + this.props.user.id;

    // set the select conference to empty object on landing on this page
    // used to allow the form to become an ADD form instead of EDIT
    this.props.dispatch(setAdminSelectedConference({}));

    axios.get(url)
      .then(response => {
        console.log('response in createEvent: ', response);

        //add userID to store
        this.props.dispatch(decorateUserWithDBUserID(response.data.id));
        // set the local state with the redux store ID that was just made 
        // this.setState({ user_id: this.props.user.userID }); // probably not necessary

        // make call to get the conferences with the newly gotten HOSTID
        let getConferencesURL = SERVER_URL + 'api/getConferencesByHostID/' + this.props.user.userID;

        axios.get(getConferencesURL).then(response => {
          console.log('response: ', response.data);
          // put the response's info into the redux store
          this.props.dispatch(setInitialHostData(response.data));
          this.setState({
            events: response.data
          });
        }).catch(err => {
          console.log('error getting conferences ', err);
        });
      }).catch(err => {
        console.log('error getting host id ', err);
      });
    console.log('bottom of the component did mount component ', this.props);
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
          rightNavigation="EditConferenceForm"
          rightIcon="add"
        />
        <Content>
          <Button rounded transparent onPress={() => {this._signOut();}}>
            <Title>Logout</Title>
          </Button>
          <EventsList navigation={this.props.navigation} events={this.state.events}/>
        </Content>
      </Container>
    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer,
    user: state.userReducer
  };
};

export default connect(mapStateToProps)(AdminLanding);