import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../../../config/config.js';
import { connect } from 'react-redux';
import renderListOfDatesFromConference from '../adminStack/helpers/renderListOfDatesFromConference.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import { Drawer, Content, Container, Tabs, Tab, Header, Grid, Left, Col, Body, Right, Icon, Button, Title, Text, List, ListItem } from 'native-base';
import AttendeeFooter from './AttendeeFooter.js';
import SideBar from './Sidebar';

  class MasterSchedule extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
      dates: renderListOfDatesFromConference(this.props.conference)
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    axios.get(`${Config.server.url}api/presentations/${this.props.conference.id}`)
      .then(response => {
        this.setState({
          presentations: response.data
        })
      })
  }

  handleOnPress() {
    console.log('Ouch..');
  }

  render() {

    var colors = ['#ff2d55', '#5856d6', '#007aff', '#5ac8fa', '#ffcc22', '#ff954f', '#ff3b30'];

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
          <Container>
          <Tabs initialPage={0}>
            {
              this.state.dates.map((date, i) => {
                return (
                  <Tab key={i} heading={date}>
                    <Content>
                      {
                        this.state.presentations.filter(presentation => {
                          console.log('convertDateToEnglish(presentation.date): ', convertDateToEnglish(presentation.date))
                          console.log('date: ', date);
                          return convertDateToEnglish(presentation.date) === date;
                        }).sort((a, b) => {
                          return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
                        }).map((presentation, i) => {
                          return (
                            <List key={i}>
                              <ListItem avatar onPress={this.handleOnPress.bind(this)}>
                                <Left>
                                  <Grid style={{ alignSelf: "center", width: 0, flex: 0, paddingLeft: 5}}>
                                    <Col style={{ backgroundColor:  colors[Math.floor(Math.random() * (colors.length - 1 + 1))], height: 50, width: 5}}></Col>
                                  </Grid>
                                  <Text>{presentation.time}</Text>
                                </Left>
                                <Body>
                                  <Text>{presentation.name}</Text>
                                  <Text note>{presentation.location}</Text>
                                </Body>
                                  <Right>
                                    <Button small transparent>
                                      <Icon name="ios-add-circle-outline" style={{color: '#428bca'}}/>
                                    </Button>
                                  </Right>
                              </ListItem>
                            </List>
                          )
                        })
                      }
                    </Content>
                  </Tab>
                )
              })
            }
          </Tabs>
        </Container>
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

export default connect(mapStateToProps)(MasterSchedule);

