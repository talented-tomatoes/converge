import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import SideBar from './Sidebar';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';

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
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Venue Map"
        />
        <Content style={{padding: 10}}>
          <Image source={{uri: this.props.conference.venue_map}} style={{height: 500, flex: 1}}/>
        </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
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

