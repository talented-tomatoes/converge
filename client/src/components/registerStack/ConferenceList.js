import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import ConferenceListEntry from './ConferenceListEntry.js';
import ConferenceDetails from './ConferenceDetails.js';
import Config from '../../../../config/config.js';
import axios from 'axios';
import RegisterStackHeader from './helpers/RegisterStackHeader.js'


export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  componentDidMount() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + 'api/conferences')
      .then(response => {
        this.setState({
          conferences: response.data
        })

      })
      .catch(error => {
        console.log(error);
      });
  }

  // static navigationOptions = {
  //   tabBarLabel: 'Conferences',
  //   title: 'Conferences'
  // };

  render() {
    return (
      <Container>
        <RegisterStackHeader
          leftOnPress={() => console.log('drawer open')}
          leftIcon="menu"
          title="All Events"
        />
        <Content>
          {
            this.state.conferences.map((conference, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ConferenceDetails', { navigation: this.props.navigation, conference: conference })}>
                  <ConferenceListEntry conference={conference}/>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </Container>
    );
  }
}