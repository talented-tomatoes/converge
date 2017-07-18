import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import AppStack from './Screens';
import configureStore from './configureStore';

const store = configureStore();

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
import Camera from './components/registerStack/Camera';
import SpeakerList from './components/registerStack/SpeakerList.js';
import SpeakerDetails from './components/registerStack/SpeakerDetails.js';

//AdminStack
import AdminLanding from './components/adminStack/AdminLanding';
import CreateEvent from './components/adminStack/CreateEvent';
import EventDetails from './components/adminStack/EventDetails';
import ScheduleEditPage from './components/adminStack/ScheduleEditPage';
import SpeakersEditPage from './components/adminStack/SpeakersEditPage';
import MapEditPage from './components/adminStack/MapEditPage';
import EditTabs from './components/adminStack/EditPageTabs'


export default class App extends React.Component {
  static navigationOptions = {

  }

  componentDidMount() {
    console.log('componentDidMount');
  }
  //This is our main app
  render() {
    return (
      <Provider store={store} >
        <AppStack />
      </Provider>
    )
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

const EditStack = TabNavigator({
  Schedule: { screen: ScheduleEditPage },
  Speakers: { screen: SpeakersEditPage },
  MapEdit: { screen: MapEditPage },
})

const AdminStack = StackNavigator({
  AdminLanding: { screen: AdminLanding },
  CreateEvent: { screen: CreateEvent },
  // next item will be a page with TabNavigators
  EditTabs: { screen: EditTabs },
  EditStack: { screen: EditStack },
}, {
  headerMode: 'none'
})


const RegisterStack = StackNavigator({
  Register: { screen: Register },
  AdminStack: { screen: AdminStack },
  ConferenceList: { screen: ConferenceList },
  ConferenceDetails: { screen: ConferenceDetails },
  Camera: { screen: Camera },
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


AppRegistry.registerComponent('converge', () => App);
