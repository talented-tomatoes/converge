import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { Image } from 'react-native';

export default class EditSpeakersListEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // onPress I need to go to the edit page of the speaker
      <ListItem avatar onPress={() => {
        // navigate to the EditSchedule form and pass it an object
        console.log('props', this.props); 
      }}>
        <Left>
          <Thumbnail source={{ uri: this.props.speaker.avatar_url ? this.props.speaker.avatar_url : 'https://rentcircles.com/assets/no-pic.jpg'}} />
          </Left>
        <Body>
          <Text>{this.props.speaker.first_name} {this.props.speaker.last_name}</Text>
          <Text note>{this.props.speaker.job_title}</Text>
          </Body>
        </ListItem>
    );
  }

}
