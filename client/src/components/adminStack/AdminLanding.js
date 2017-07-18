import React, { Component, PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon, Body } from 'native-base';
import NewEvent from './CreateEvent.js';
import EventsList from './EventsList.js';


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


  // ADMIN LANDING PAGE
  render() {
    return (
      <Container>
        <Content>
          <EventsList navigate={this.props.navigation.navigate}/>
        </Content>
      </Container>
    );
  }
}

