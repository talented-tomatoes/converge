import React, { Component } from 'react';
import { AppRegistry, Image, TouchableHighlight } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

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
                <Text note>{this.props.conference.city}, {this.props.conference.dates}</Text>
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

