import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Text } from 'native-base';

import { StackNavigator } from 'react-navigation';

import SplashScreen from './components/SplashScreen';
import Auth from './components/Auth';

//AttendeeStack
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

//AdminStack
import CreateEvent from './components/adminStack/CreateEvent';


export default class App extends React.Component {
  static navigationOptions = {

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
}, {
  headerMode: 'none'
})

const AppStack = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Auth: { screen: Auth},
  AttendeeStack: { screen: AttendeeStack },
  RegisterStack: { screen: RegisterStack },
}, {
  headerMode: 'none'
})


AppRegistry.registerComponent('converge', () => AppStack);
