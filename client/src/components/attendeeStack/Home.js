import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttendeeFooter from './AttendeeFooter.js';
import { Image } from 'react-native';
import { Drawer, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';

import SideBar from './Sidebar';

class Home extends Component {
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
    const { params } = this.props.navigation.state;
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
            <Title>Welcome!</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Image source={{uri: this.props.conference.banner }} style={{height: 200, width: null, flex: 1}}/>
          <Body>
            <Text>{this.props.conference.details}</Text>
          </Body>
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

export default connect(mapStateToProps)(Home);
