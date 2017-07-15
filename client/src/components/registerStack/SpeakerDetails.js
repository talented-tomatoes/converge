import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Icon, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';

export default class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Speaker Details'
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Title>{params.speaker.name}</Title>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: params.speaker.picture}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  {params.speaker.bio}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}