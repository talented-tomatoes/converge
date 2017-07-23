import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import AttendeeFooter from './AttendeeFooter.js';
import SpeakerList from '../registerStack/SpeakerList.js';
import SideBar from './Sidebar';

class Speakers extends Component {
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
    console.log('INSIDE SPEAEKERS ===>', this.props);
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
            <Title>Speakers</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <SpeakerList conferenceID={this.props.conference.id} navigation={this.props.navigation}></SpeakerList>
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

export default connect(mapStateToProps)(Speakers);
