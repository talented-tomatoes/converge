import React, { Component } from 'react';
import { Footer, FooterTab, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';

export default class EditConferenceFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('EditSchedule')}}>
              <Icon ios="ios-home-outline" android="md-home"/>
              <Text style={{fontSize: 10}}>Schedule</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('EditSpeakers')}}>
              <Icon ios="ios-people-outline" android="md-people"/>
              <Text style={{fontSize: 10}}>Speakers</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('EditConference')}}>
              <Icon ios="ios-settings-outline" android="md-settings"/>
              <Text style={{fontSize: 10}}>Details</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}



