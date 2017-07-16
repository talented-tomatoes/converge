import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ConferenceListEntry from './ConferenceListEntry.js';
import ConferenceDetails from './ConferenceDetails.js';
import mockData from '../../../../db/mockData';
import { Container, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : mockData
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Conferences',
    title: 'Conferences'
  };

  render() {

    const conferenceListItems = this.state.conferences.map((conference, i) =>
    <TouchableOpacity key ={i} onPress={() => this.props.navigation.navigate('ConferenceDetails', { navigation: this.props.navigation, conference: conference })}>
      <ConferenceListEntry conference={conference}/>
    </TouchableOpacity>
    );

    return (
      <Container>
        <Content>
          {conferenceListItems}
        </Content>
      </Container>
    );
  }
}