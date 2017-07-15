import React, { Component, PropTypes } from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Button, Content, Text, Header, Right, Title, Left, Icon } from 'native-base';
import NewEvent from './AdminNewEvent.js';


export default class Admin extends React.Component {
  static navigationOptions = {

  };
  // constructor(props){
    // super(props);
  // }

  // ADMIN LANDING PAGE
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header> 
          <Right>
            <Button 
              onPress={() => navigate('CreateEvent')}
              transparent>
              <Icon name="add" />
              </Button>
            </Right>
        </Header>
        <Content>
          <Text> Event #1 </Text>
          <Text> Event #2 </Text>
          <Text> Event #3 </Text>

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

