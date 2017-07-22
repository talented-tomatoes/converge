import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';

export default class ConferenceListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={{uri: this.props.conference.logo}} />
              <Body>
                <Text>{this.props.conference.name}</Text>
                <Text note>{this.props.conference.start_date} to {this.props.conference.end_date}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: this.props.conference.banner}} style={{height: 200, flex: 1}}/>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

