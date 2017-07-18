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

    this.goCreateEvent = this.goCreateEvent.bind(this);
  }

  goCreateEvent() {
    const { navigate } = this.props.navigation;

    navigate('CreateEvent');
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
              onPress={this.goCreateEvent}
              transparent>
              <Icon name="add" />
              </Button>
            </Right>
        </Header>
        <Content>

          <EventsList navigate={navigate}/>
          
        </Content>
      </Container>
    );
  }
}

