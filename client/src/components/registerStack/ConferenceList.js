import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import ConferenceListEntry from './ConferenceListEntry.js';
import ConferenceDetails from './ConferenceDetails.js';
import axios from 'axios';

export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:3000/api/conferences')
      .then(response => {
        this.setState({
          conferences: response.data
        })

      })
      .catch(error => {
        console.log(error);
      });
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