import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content, Drawer } from 'native-base';
import ConferenceListEntry from './ConferenceListEntry.js';
import ConferenceDetails from './ConferenceDetails.js';
import Config from '../../../../config/config.js';
import axios from 'axios';
import RegisterStackHeader from './helpers/RegisterStackHeader.js';
import SideBar from '../helpers/ProfileSidebar';



export default class ConferenceListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    console.log('drawer open');
    this.drawer._root.open()
  };

  componentDidMount() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + 'api/conferences')
      .then(response => {
        this.setState({
          conferences: response.data
        })

      })
      .catch(error => {
        console.log(error);
      });
  }

  // static navigationOptions = {
  //   tabBarLabel: 'Conferences',
  //   title: 'Conferences'
  // };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <RegisterStackHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="All Events"
        />
        <Content>
          {
            this.state.conferences.map((conference, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('ConferenceDetails', { navigation: this.props.navigation, conference: conference })}>
                  <ConferenceListEntry conference={conference}/>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </Drawer>
    );
  }
}