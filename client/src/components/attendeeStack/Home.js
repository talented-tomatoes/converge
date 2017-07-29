import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Drawer, Content, Header, Container, Card, CardItem, Grid, Col, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';
import randomColor from '../helpers/randomColor';
import SideBar from './Sidebar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.randomColor = randomColor()
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
      <Container>
        <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
          <AttendeeConferenceHeader
            leftOnPress={this.openDrawer.bind(this)}
            leftIcon="menu"
            title="Welcome"
          />
          <Content style={{padding: 10}}>
            <Card style={{flex: 0}}>
              <Image source={{uri: this.props.conference.banner}} style={{height: 200, flex: 1}}/>
              <CardItem>
                <Body>
                  <Text style={{padding: 10}}>
                    {this.props.conference.details}
                  </Text>
                </Body>
              </CardItem>
              <Grid style={{ alignSelf: "center", flex: 0}}>
                <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
              </Grid>
            </Card>
          </Content>
          <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
        </Drawer>
      </Container>
    
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.attendeeReducer
  }
}

export default connect(mapStateToProps)(Home);

/*
<Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Welcome"
        />
        <Content>
          <Image source={{uri: this.props.conference.banner }} style={{height: 200, width: null, flex: 1}}/>
          <Body>
            <Text>{this.props.conference.details}</Text>
          </Body>
        </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation} />
      </Drawer>
*/