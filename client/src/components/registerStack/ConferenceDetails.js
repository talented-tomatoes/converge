import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import mockData from '../../../../db/mockData';
import SpeakerList from './SpeakerList.js';

export default class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Conference Details'
  };

  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Title>{params.conference.name}</Title>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {params.conference.details}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button onPress={() => this.props.navigation.navigate('Payment')}>
                <Text style={{color: 'white'}}>Attend</Text>
              </Button>
            </CardItem>
         </Card>
         <SpeakerList speakers={params.conference.speakers} navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}