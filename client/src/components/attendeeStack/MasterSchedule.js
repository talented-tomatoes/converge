import React, { Component } from 'react';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import AttendeeFooter from './AttendeeFooter.js';
import SideBar from './Sidebar';

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
        <Header>
          <Left>
            <Button dark transparent onPress={() => {this.openDrawer()}}>
              <Icon ios='md-menu' android="md-menu"/>
            </Button>
          </Left>
          <Body>
            <Title>Event Schedule</Title>
          </Body>
          <Right />
        </Header>
        <Content>
           <Text>Event Schedule</Text>
        </Content>
        <AttendeeFooter navigation={this.props.navigation}></AttendeeFooter>
      </Drawer>
    );
  }
}

