import React, { Component } from 'react';
import { Drawer, Content, Text, Toast, Container, Button, Icon, Tabs, Body, Tab, List, ListItem, Left, Grid, Col, Right } from 'native-base';
import SideBar from './Sidebar';
import Config from '../../../../config/config.js';
import axios from 'axios';
import { connect } from 'react-redux';
import renderListOfDatesFromConference from '../adminStack/helpers/renderListOfDatesFromConference.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';

class MySchedule extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
      dates: renderListOfDatesFromConference(this.props.conference),
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    this.getUserSchedule();
  }

  getUserSchedule() {
    axios.get(`${Config.server.url}api/join/users_presentations/${this.props.user.id}`)
      .then(response => {
        this.setState({
          presentations: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDeletePress(presentation) {
    axios.delete(`${Config.server.url}api/join/users_presentations/${this.props.user.id}/${presentation.id}`)
      .then(response => {
        this.getUserSchedule();
        Toast.show({
            text: `${presentation.name} removed from your schedule`,
            position: 'bottom',
            buttonText: 'X',
            type: 'warning',
            duration: 2000
         });
      });
  }

  render() {

    var colors = ['#ff2d55', '#5856d6', '#007aff', '#5ac8fa', '#ffcc22', '#ff954f', '#ff3b30'];

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="My Schedule"
        />
        <Container>
          <Tabs initialPage={0}>
            {
              this.state.dates.map((date, i) => {
                return (
                  <Tab key={i} heading={date}>
                    <Content>
                      {
                        this.state.presentations.filter(presentation => {
                          return convertDateToEnglish(presentation.date) === date;
                        }).sort((a, b) => {
                          return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
                        }).map((presentation, i) => {
                          console.log('presentations?', presentation);
                          return (
                            <List key={i}>
                              <ListItem avatar>
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
                                    <Button small transparent onPress={this.handleDeletePress.bind(this, presentation)}>
                                      <Icon name="trash" style={{color: '#428bca'}}/>
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
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.attendeeReducer,
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(MySchedule);

