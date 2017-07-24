import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import AttendeeFooter from './AttendeeFooter.js';
import SideBar from './Sidebar';

class VenueMap extends Component {
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
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{padding: 10}}>
          <Image source={{uri: this.props.conference.venue_map}} style={{height: 500, flex: 1}}/>
        </Content>
        <AttendeeFooter navigation={this.props.navigation}></AttendeeFooter>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.attendeeReducer
  }
}

export default connect(mapStateToProps)(VenueMap);

