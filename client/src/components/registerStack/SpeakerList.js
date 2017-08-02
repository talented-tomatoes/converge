import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SpeakerListEntry from './SpeakerListEntry.js';
import { Container, Header, Right, Content, Card, Title, CardItem, ListItem, Thumbnail, Text, Button, Icon, List, Left, Body } from 'native-base';
import Config from '../../../../config/config.js';
import randomColor from '../helpers/randomColor';


export default class SpeakerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers : []
    }
    this.randomColor = randomColor();

  }

  componentDidMount() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + `api/speakers/${this.props.conferenceID}`)
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
    return (
      <Content style={{paddingLeft: 10, paddingRight: 10}}>

        {
          this.state.speakers.map((speaker, i) => {
            return (<SpeakerListEntry key={i} speaker={speaker} navigation={this.props.navigation} backPage={this.props.backPage} isUserPaid={this.props.isUserPaid} randomColor={this.randomColor}/>)
          })
        }
      </Content>
    );
  }
}