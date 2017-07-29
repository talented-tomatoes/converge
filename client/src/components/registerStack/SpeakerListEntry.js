import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Right, Content, Card, CardItem, ListItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class SpeakerListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var params = {
      backPage: this.props.backPage,
      speaker: this.props.speaker
    }
    return (
      <ListItem avatar>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', params)}>
          <Left>
            <Thumbnail small source={{ uri: this.props.speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
          </Left>
        </TouchableOpacity>
        <Body>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', params)}>
             <Text>{this.props.speaker.first_name + ' ' + this.props.speaker.last_name}</Text>
             <Text note>{this.props.speaker.job_title}</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}