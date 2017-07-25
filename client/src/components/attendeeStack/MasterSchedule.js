import React, { Component } from 'react';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import SideBar from './Sidebar';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';

export default class MasterSchedule extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Schedule"
        />

        <Content>
           <Text>Event Schedule</Text>
        </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
      </Drawer>
    );
  }
}

