import React, { Component } from 'react';
import { Footer, FooterTab, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';

export default class AttendeeConferenceFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer style={{backgroundColor: '#428bca'}}>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Home')}}>
              <Icon style={{color: 'white'}} ios="ios-home-outline" android="md-home"/>
              <Text style={{color: 'white', fontSize: 10}}>Home</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('MySchedule')}}>
              <Icon style={{color: 'white'}} ios="ios-calendar-outline" android="md-calendar"/>
              <Text style={{color: 'white', fontSize: 9}}>My Schedule</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('VenueMap')}}>
              <Icon style={{color: 'white'}} ios="ios-map-outline" android="md-map"/>
              <Text style={{color: 'white', fontSize: 10}}>Map</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Concierge')}}>
              <Icon style={{color: 'white'}} ios="ios-help-buoy-outline" android="md-help-buoy"/>
              <Text style={{color: 'white', fontSize: 10}}>Concierge</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}



