import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Right, Content, Card, CardItem, ListItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class ConferenceListScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ListItem avatar>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', { speaker: this.props.speaker })}>
          <Left>
            <Thumbnail small source={{ uri: this.props.speaker.picture }} />
          </Left>
        </TouchableOpacity>
        <Body>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', { speaker: this.props.speaker })}>
            <Text>{this.props.speaker.name}</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}