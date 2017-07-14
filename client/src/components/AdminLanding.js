import React, { Component, PropTypes } from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Text } from 'native-base';
import AdminEvents from './AdminEvents.js';
import NewEvent from './AdminNewEvent.js';


export default class Admin extends React.Component {
  static navigationOptions = {
    title: 'Admin Home'
  };
  // constructor(props){
    // super(props);
  // }

  // ADMIN LANDING PAGE
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Button 
            light 
            onPress={() => navigate('Events')}
            title="My Events">
            <Text> My Events </Text>
            </Button>

          <Button 
            primary
            onPress={() => navigate('CreateEvent')}
            title="Create New Event">
            <Text> Add Events </Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

// AppRegistry.registerComponent('converge', () => Admin);
