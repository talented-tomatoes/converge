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
import MasterSchedule from './components/attendeeStack/MasterSchedule';
import PresentationDetails from './components/attendeeStack/PresentationDetails';
import EditAttendeeProfileForm from './components/attendeeStack/EditAttendeeProfileForm'
//RegisterStack
import Register from './components/registerStack/Register';
import ConferenceList from './components/registerStack/ConferenceList';
import ConferenceDetails from './components/registerStack/ConferenceDetails';
import SpeakerList from './components/registerStack/SpeakerList.js';
import SpeakerDetails from './components/registerStack/SpeakerDetails.js';
import PaymentForm from './components/registerStack/PaymentForm.js';


//AdminStack
import AdminLanding from './components/adminStack/AdminLanding';
// removing this because we have this is the version not using redux-form
// import CreateEvent from './components/adminStack/CreateEvent';
import AddSpeakers from './components/adminStack/SpeakerLanding';
import AddSpeakersForm from './components/adminStack/AddSpeakersForm';
import AddPresentation from './components/adminStack/AddPresentation';
import AddPresentationForm from './components/adminStack/AddPresentationForm';
import EditConference from './components/adminStack/EditConference';
import EditConferenceForm from './components/adminStack/EditConferenceForm';
import EditAdminProfileForm from './components/adminStack/EditAdminProfileForm';
import SpeakerPicker from './components/adminStack/helpers/SpeakerPicker.js';



const AttendeeStack = StackNavigator({
  MyEvents: { screen: MyEvents },
  Home: { screen: Home },
  MySchedule: { screen: MySchedule },
  VenueMap: { screen: VenueMap },
  Concierge: { screen: Concierge},
  Speakers: { screen: Speakers },
  Checkin: { screen: Checkin },
  MasterSchedule: { screen: MasterSchedule},
  PresentationDetails: { screen: PresentationDetails },
  EditAttendeeProfileForm: { screen: EditAttendeeProfileForm },
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
  // CreateEvent: { screen: CreateEvent },
  AddPresentation: { screen: AddPresentation },
  AddPresentationForm: { screen: AddPresentationForm },
  AddSpeakers: { screen: AddSpeakers },
  AddSpeakersForm: { screen: AddSpeakersForm },
  EditConference: { screen: EditConference },
  EditConferenceForm: { screen: EditConferenceForm },
  EditAdminProfileForm: { screen: EditAdminProfileForm },
  SpeakerPicker: { screen: SpeakerPicker }
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
  SpeakerList: { screen: SpeakerList },
  SpeakerDetails: { screen: SpeakerDetails },
  AttendeeStack: { screen: AttendeeStack },
  PaymentForm: { screen: PaymentForm }
}, {
  headerMode: 'none',
});

export default AppStack = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Auth: { screen: Auth},
  AttendeeStack: { screen: AttendeeStack },
  RegisterStack: { screen: RegisterStack },
  // AdminStack: { screen: AdminStack },
}, {
  headerMode: 'none'
});



