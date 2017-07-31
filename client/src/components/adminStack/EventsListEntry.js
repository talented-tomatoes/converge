import React, { Component } from 'react';
import convertDateToEnglish from './helpers/convertDateToEnglish';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native';

export default class EventsListEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var year = this.props.eventData.start_date.slice(0, 4);
    return (
      <Content style={{padding: 10}}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: this.props.eventData.logo}} />
              <Body>
                <Text>{this.props.eventData.name}</Text>
                <Text note> {`${convertDateToEnglish(this.props.eventData.start_date)}, ${year} to ${convertDateToEnglish(this.props.eventData.end_date)}, ${year}`}</Text>
                </Body>
              </Left>
           </CardItem>
           <CardItem cardBody>
             <Image
              source={{uri: this.props.eventData.banner}}
              style={{height: 200, width: null, flex: 1}}
              />
            </CardItem>
          </Card>
      </Content>
    );
  }
}