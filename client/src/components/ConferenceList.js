import React, { Component } from 'react';
import { AppRegistry, Image, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ConferenceListEntry from './ConferenceListEntry.js';
import ConferenceDetails from './ConferenceDetails.js';
import { Container, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : [
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        },
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        },
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        }
      ]
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Conferences',
    title: 'Conferences'
  };

  render() {

    const conferenceListItems = this.state.conferences.map((conference) => 
      <ConferenceListEntry conference={conference} navigation={this.props.navigation}/>
    );

    return (
      <Container>
        <Content>
          {conferenceListItems}
        </Content>
      </Container>
    );
  }
}

export default ConferenceList = StackNavigator({
  ConferenceListScreen: { screen: ConferenceListScreen},
  ConferenceDetails: { screen: ConferenceDetails }
});

// AppRegistry.registerComponent('converge', () => ConferenceList);
