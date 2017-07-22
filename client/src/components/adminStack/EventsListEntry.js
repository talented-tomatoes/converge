import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';

export default class EventsListEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: this.props.eventData.logo}} />
              <Body>
                <Text>{this.props.eventData.name}</Text>
                <Text note> {this.props.eventData.details}</Text>
                </Body>
              </Left>
           </CardItem>
           <CardItem cardBody>
             <Image
              source={{uri: this.props.eventData.banner}}
              style={{height: 200, width: null, flex: 1}} 
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text> {this.props.eventData.start_date}  -    {this.props.eventData.end_date}</Text>
                </Left>
                </CardItem>
          </Card>
      </Content>
    );
  }
}