import React, { Component } from 'react';
import { Footer, FooterTab, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import { NavigationActions } from 'react-navigation';


export default class EditConferenceFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'AdminLanding'})
      ]
    })


    return (
      <Footer>
          <FooterTab>
            <Button onPress={() => {resetAction; this.props.navigation.navigate('AddPresentation')}}>
              <Icon ios="ios-home-outline" android="md-home"/>
              <Text style={{fontSize: 10}}>Schedule</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {resetAction; this.props.navigation.navigate('AddSpeakers')}}>
              <Icon ios="ios-people-outline" android="md-people"/>
              <Text style={{fontSize: 10}}>Speakers</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('CheckedInAttendees')}}>
              <Icon ios="ios-people-outline" android="md-people"/>
              <Text style={{fontSize: 10}}>Checked in</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {resetAction; this.props.navigation.navigate('EditConferenceForm')}}>
              <Icon ios="ios-settings-outline" android="md-settings"/>
              <Text style={{fontSize: 10}}>Edit</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}



