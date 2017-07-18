import React, { Component } from 'react';
import { Footer, FooterTab, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';

export default class AttendeeFooter extends Component {

	constructor(props) {
    super(props);
	}

	render() {
		return (
			<Footer>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Home')}}>
              <Icon ios="ios-home-outline" android="md-home"/>
              <Text style={{fontSize: 10}}>Home</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('MySchedule')}}>
              <Icon ios="ios-calendar-outline" android="md-calendar"/>
              <Text style={{fontSize: 10}}>My Schedule</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('VenueMap')}}>
              <Icon ios="ios-map-outline" android="md-map"/>
              <Text style={{fontSize: 10}}>Map</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Concierge')}}>
              <Icon ios="ios-help-buoy-outline" android="md-help-buoy"/>
              <Text style={{fontSize: 10}}>Concierge</Text>
            </Button>
          </FooterTab>
        </Footer>
		);
	}
}



