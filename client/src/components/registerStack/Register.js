import React, { Component } from 'react';
import { Container, Content, Text, Button, Footer } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ProfileForm from './ProfileForm';

import Swiper from 'react-native-swiper';

class Register extends Component {
  static navigationOptions = {
    title: 'Finish Your Profile',
  };
  constructor(props) {
    super(props);
    this.state = {
      isAttendee: true,
    }
    console.log('user: ', this.props.user)
  }

  render() {
    console.log('this.props in register screen: ', this.props);
    return (
      <ProfileForm user={this.props.user} navigation={this.props.navigation} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    conference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(Register);