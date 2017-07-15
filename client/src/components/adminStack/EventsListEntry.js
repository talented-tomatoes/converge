import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';
import EventDetails from './EventDetails.js';

export default class EventsListEntry extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   data: []
    // }

  }

  render() {    

    return (
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: this.props.eventData.thumbnail}} />
              <Body>
                <Text>{this.props.eventData.title}</Text>
                <Text note> {this.props.eventData.description}</Text>
                </Body>
              </Left>
           </CardItem>
           <CardItem cardBody>
             <Image
              source={{uri: this.props.eventData.image}}
              style={{height: 200, width: null, flex: 1}} 
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text> {this.props.eventData.date} </Text>
                </Left>
                </CardItem>
          </Card>
      </Content>
    );
  }
}