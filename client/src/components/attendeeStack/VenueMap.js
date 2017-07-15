import React, { Component } from 'react';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';

import SideBar from './Sidebar';

export default class VenueMap extends Component {
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
  //This is our main app
  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <Header>
          <Left>
            <Button dark transparent onPress={() => {this.openDrawer()}}>
              <Icon ios='md-menu' android="md-menu" style={{padding: 10}}/>
            </Button>
          </Left>
          <Body>
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>VenueMap</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Home')}}>
              <Icon ios="ios-home-outline" android="md-home"/>
              <Text style={{fontSize: 10}}>Home</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('MySchedule')}}>
              <Icon ios="ios-calendar-outline" android="md-calendar"/>
              <Text style={{fontSize: 10}}>My Schedule</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('VenueMap')}}>
              <Icon ios="ios-map-outline" android="md-map"/>
              <Text style={{fontSize: 10}}>Map</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => {this.props.navigation.navigate('Concierge')}}>
              <Icon ios="ios-help-buoy-outline" android="md-help-buoy"/>
              <Text style={{fontSize: 10}}>Concierge</Text>

            </Button>
          </FooterTab>
        </Footer>
      </Drawer>
    );
  }
}

