import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Text } from 'native-base';

import { StackNavigator } from 'react-navigation';

import SplashScreen from './components/SplashScreen';
import Auth from './components/Auth';

//AttendeeStack
import MyEvents from './components/attendeeStack/MyEvents';
import MySchedule from './components/attendeeStack/MySchedule';
import VenueMap from './components/attendeeStack/VenueMap';
import Concierge from './components/attendeeStack/Concierge';
import Sidebar from './components/attendeeStack/Sidebar';
import Home from './components/attendeeStack/Home';
import Speakers from './components/attendeeStack/Speakers';
import Presentations from './components/attendeeStack/Presentations';
import MasterSchedule from './components/attendeeStack/MasterSchedule';

//RegisterStack
import Register from './components/registerStack/Register';
import ConferenceList from './components/registerStack/ConferenceList';
import ConferenceDetails from './components/registerStack/ConferenceDetails';
import SpeakerList from './components/registerStack/SpeakerList.js';
import SpeakerDetails from './components/registerStack/SpeakerDetails.js';

//AdminStack
import CreateEvent from './components/adminStack/CreateEvent';

import axios from 'axios';

export default class App extends React.Component {
  static navigationOptions = {

  }

  componentDidMount() {
    console.log('componentDidMount');
  }
  //This is our main app
  render() {
    return (
      <Container>
        <Text>This pages routes everything!</Text>
      </Container>
    );
  }
}

const AttendeeStack = StackNavigator({
  MyEvents: { screen: MyEvents },
  Home: { screen: Home },
  MySchedule: { screen: MySchedule },
  VenueMap: { screen: VenueMap },
  Concierge: { screen: Concierge},
  Speakers: { screen: Speakers },
  Presentations: { screen: Presentations },
  MasterSchedule: { screen: MasterSchedule},
}, {
  headerMode: 'none',
});

const AdminStack = StackNavigator({
  CreateEvent: { screen: CreateEvent },
}, {
  headerMode: 'none'
})

const RegisterStack = StackNavigator({
  Register: { screen: Register },
  AdminStack: { screen: AdminStack },
  ConferenceList: { screen: ConferenceList },
  ConferenceDetails: { screen: ConferenceDetails },
  SpeakerList: { screen: SpeakerList },
  SpeakerDetails: { screen: SpeakerDetails}
});

const AppStack = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Auth: { screen: Auth},
  AttendeeStack: { screen: AttendeeStack },
  RegisterStack: { screen: RegisterStack },
}, {
  headerMode: 'none'
})


AppRegistry.registerComponent('converge', () => AppStack);
