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
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Body>
              <Image style={{width: 80, height: 50}}source={{uri: this.props.conference.logo}} />
              <Text>{this.props.conference.name}</Text>
              <Text note>{this.props.conference.city}, {this.props.conference.dates}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('ConferenceDetails', { navigation: this.props.navigation, conference: this.props.conference })}>
              <Image source={{uri: this.props.conference.banner}} style={{height: 115, width: 325}}/>
            </TouchableHighlight>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

