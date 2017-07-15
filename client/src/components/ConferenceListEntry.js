import React, { Component } from 'react';
import { AppRegistry, Image, TouchableHighlight } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class ConferenceListEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'Conference List Entry',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  handleImagePress() {
    console.log('Image pressed..')
  }
  //This is our main app
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
            <TouchableHighlight onPress={this.handleImagePress}>
              <Image source={{uri: this.props.conference.banner}} style={{height: 115, width: 325}}/>
            </TouchableHighlight>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

// AppRegistry.registerComponent('converge', () => ConferenceListEntry);
