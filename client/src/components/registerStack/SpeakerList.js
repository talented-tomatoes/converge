import React, { Component } from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SpeakerListEntry from './SpeakerListEntry.js';
import { Container, Header, Right, Content, Card, Title, CardItem, ListItem, Thumbnail, Text, Button, Icon, List, Left, Body } from 'native-base';

export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const speakerListItems = this.props.speakers.map((speaker, i) =>
      <SpeakerListEntry key={i} speaker={speaker} navigation={this.props.navigation}/>
    );

    return (
      <List>
        {speakerListItems}
      </List>
    );
  }
}