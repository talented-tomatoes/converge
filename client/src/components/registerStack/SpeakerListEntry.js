import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Right, Content, Card, CardItem, ListItem, Thumbnail, Text, Button, Icon, Left, Body, Grid, Col } from 'native-base';

export default class SpeakerListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSpeakerPress() {
    
    this.props.navigation.navigate('SpeakerDetails', {backPage: this.props.backPage, speaker: this.props.speaker});
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={this.handleSpeakerPress.bind(this)}>
          <CardItem header>
            <Thumbnail small source={{ uri: this.props.speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
            <TouchableOpacity style={{marginLeft: 15}} onPress={this.handleSpeakerPress.bind(this)}>
              <Text>{this.props.speaker.first_name + ' ' + this.props.speaker.last_name}</Text>
              <Text note>{this.props.speaker.job_title}</Text>
            </TouchableOpacity>
          </CardItem>
        </TouchableOpacity>

      </Card>
    );
  }
}