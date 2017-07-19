import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon, Body } from 'native-base';
import NewEvent from './CreateEvent.js';
import EventsList from './EventsList.js';
import SpaceXData from './dummy/spaceX.js';
import AmazonData from './dummy/amazon.js';
import GoogleData from './dummy/google.js';
import { connect } from 'react-redux';
// import the reducer/action 


export default class Admin extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Events',
      headerRight: <Button transparent onPress={() => navigation.navigate('CreateEvent')}><Icon name="add"/></Button>
    }
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log('Admin Landing Page mounted!');
    
    // redux the dummyData

    // get events now
  }

  getEvents() {
    console.log('=====Fetching Events=====');
    axios.get(URL_GOES_HERE).then(function(response) {
      //set state here
    }).catch(function(err) {
      //handle error stuff here;
    });
  }



  // ADMIN LANDING PAGE
  render() {
    return (
      <Container>
        <Content>
          <EventsList navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}


