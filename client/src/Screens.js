// import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
// import { Container, Text } from 'native-base';

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
import Checkin from './components/attendeeStack/Checkin';
import Presentations from './components/attendeeStack/Presentations';
import MasterSchedule from './components/attendeeStack/MasterSchedule';

//RegisterStack
import Register from './components/registerStack/Register';
import ConferenceList from './components/registerStack/ConferenceList';
import ConferenceDetails from './components/registerStack/ConferenceDetails';
import Camera from './components/registerStack/Camera';
import SpeakerList from './components/registerStack/SpeakerList.js';
import SpeakerDetails from './components/registerStack/SpeakerDetails.js';

//AdminStack
import AdminLanding from './components/adminStack/AdminLanding';
import CreateEvent from './components/adminStack/CreateEvent';
import EditSpeakers from './components/adminStack/EditSpeakers';
import EditSpeakersForm from './components/adminStack/EditSpeakersForm';
import EditSchedule from './components/adminStack/EditSchedule';
import EditScheduleForm from './components/adminStack/EditScheduleForm';
import EditConference from './components/adminStack/EditConference';
import EditConferenceForm from './components/adminStack/EditConferenceForm';


const AttendeeStack = StackNavigator({
  MyEvents: { screen: MyEvents },
  Home: { screen: Home },
  MySchedule: { screen: MySchedule },
  VenueMap: { screen: VenueMap },
  Concierge: { screen: Concierge},
  Speakers: { screen: Speakers },
  Checkin: { screen: Checkin },
  Presentations: { screen: Presentations },
  MasterSchedule: { screen: MasterSchedule},
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0
    }
  }),
});

const AdminStack = StackNavigator({
  AdminLanding: { screen: AdminLanding },
  CreateEvent: { screen: CreateEvent },
  EditSchedule: { screen: EditSchedule },
  EditScheduleForm: { screen: EditScheduleForm },
  EditSpeakers: { screen: EditSpeakers },
  EditSpeakersForm: { screen: EditSpeakersForm },
  EditConference: { screen: EditConference },
  EditConferenceForm: { screen: EditConferenceForm }
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0
    }
  }),
});

const RegisterStack = StackNavigator({
  Register: { screen: Register },
  AdminStack: { screen: AdminStack },
  ConferenceList: { screen: ConferenceList },
  ConferenceDetails: { screen: ConferenceDetails },
  Camera: { screen: Camera },
  SpeakerList: { screen: SpeakerList },
  SpeakerDetails: { screen: SpeakerDetails },
  AttendeeStack: { screen: AttendeeStack },
});

export default AppStack = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Auth: { screen: Auth},
  AttendeeStack: { screen: AttendeeStack },
  RegisterStack: { screen: RegisterStack },
}, {
  headerMode: 'none'
});



