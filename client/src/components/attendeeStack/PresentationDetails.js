import axios from 'axios';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Drawer, Container, Header, Content, Card, CardItem, ListItem, Thumbnail, Body, Text, Right, Left, Icon, Button } from 'native-base';
import SideBar from './Sidebar';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';


export default class PresentationsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    //TODO: Get all speakers in the presentations. Grab from presentations_speakers table
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Presentation"
        />
        <Container>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                  <Body>
                    <Text>{params.presentation.name}</Text>
                    <Text note>{params.presentation.date} at {params.presentation.time}</Text>
                    <Text note>{params.presentation.location}</Text>
                  </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {params.presentation.description}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>

              </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
      </Drawer>
    );
  }
}