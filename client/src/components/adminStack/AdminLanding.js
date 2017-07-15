import React, { Component, PropTypes } from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon, Body } from 'native-base';
import NewEvent from './CreateEvent.js';
import EventsList from './EventsList.js';


export default class Admin extends React.Component {
  static navigationOptions = {

  };
  constructor(props){
    super(props);
  }

  // ADMIN LANDING PAGE
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header> 
          <Body>
            <Title>My Events</Title>
          </Body>
          <Right>
            <Button 
              onPress={() => navigate('CreateEvent')}
              transparent>
              <Icon name="add" />
              </Button>
            </Right>
        </Header>
        <Content>

          <EventsList />
          
        </Content>
      </Container>
    );
  }
}

