import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SpeakerListEntry from './SpeakerListEntry.js';
import { Container, Header, Right, Content, Card, Title, CardItem, ListItem, Thumbnail, Text, Button, Icon, List, Left, Body } from 'native-base';

export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers : []
    }
  }

  componentDidMount() {
   axios.get(`http://localhost:3000/api/speakers/${this.props.conferenceID}`)
    .then(response => {
      this.setState({
        speakers: response.data
      });

    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {

    const speakerListItems = this.state.speakers.map((speaker, i) =>
      <SpeakerListEntry key={i} speaker={speaker} navigation={this.props.navigation}/>
    );

    return (
      <List>
        <ListItem itemHeader first>
          <Title>Speakers</Title>
        </ListItem>
        {speakerListItems}
      </List>
    );
  }
}