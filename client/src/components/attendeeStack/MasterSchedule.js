import React, { Component } from 'react';

import axios from 'axios';
import Config from '../../../../config/config.js';
import { connect } from 'react-redux';
import renderListOfDatesFromConference from '../adminStack/helpers/renderListOfDatesFromConference.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import { Drawer, Content, Container, Tabs, Tab, Toast, Header, Grid, Left, Col, Body, Right, Icon, Button, Title, Text, List, ListItem, Row } from 'native-base';
import randomColor from '../helpers/randomColor';

import SideBar from './Sidebar';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';

  class MasterSchedule extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      presentations: [],
      dates: renderListOfDatesFromConference(this.props.conference),
      showToast: false
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

  handleItemPress(presentation) {
    this.props.navigation.navigate('PresentationDetails', { presentation: presentation, backPage: 'MasterSchedule' });
  }

  handleSavePress(presentation) {

    axios.post(`${Config.server.url}api/join/users_presentations`, { presentation_id: presentation.id, user_id: this.props.user.id })
      .then(response => {
        //TODO: Try to store this in redux?
        if (response.data === 'success') {
          Toast.show({
              text: `Added ${presentation.name} to your schedule`,
              position: 'bottom',
              type: 'success',
              duration: 1500
          });
        }
        if (response.data === 'already added') {
          Toast.show({
            text: 'Looks like you already added this to your schedule. Please check My Schedule for more details.',
            position: 'bottom',
            buttonText: 'X',
            type: 'warning',
            duration: 2000
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeConferenceHeader
          leftOnPress={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="Schedule"
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
                        }).map((presentation, i) => {
                          return (
                            <List key={i}>
                              <Grid>
                              <Row style={{alignItems: 'center'}}>
                              <Col style={{width: '82%'}}>
                              <ListItem avatar onPress={this.handleItemPress.bind(this, presentation)}>
                                <Grid>
                                  <Row style={{alignItems: 'center'}}>
                                  <Col style={{width: '27%'}}>
                                    <Row>
                                      <Grid style={{ alignSelf: "center", width: 0, flex: 0, paddingLeft: 5}}>
                                        <Col style={{ backgroundColor:  randomColor(), height: 50, width: 5}}></Col>
                                      </Grid>
                                      <Text style={{paddingLeft: 10, marginRight: 0}}>{presentation.time}</Text>
                                    </Row>
                                  </Col>
                                  <Col style={{width: '73%'}}>
                                    <Body>
                                      <Text>{presentation.name}</Text>
                                      <Text note>{presentation.location}</Text>
                                    </Body>
                                  </Col>

                                  </Row>
                                </Grid>

                              </ListItem>
                              </Col>
                              <Col style={{width: '18%', alignItems: 'center'}}>
                                  <Button small transparent onPress={this.handleSavePress.bind(this, presentation)}>
                                    <Icon name="ios-add-circle-outline" style={{color: '#428bca'}}/>
                                  </Button>
                              </Col>
                              </Row>
                              </Grid>
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

export default connect(mapStateToProps)(MasterSchedule);


// <Left>
//                                   <Grid style={{ alignSelf: "center", width: 0, flex: 0, paddingLeft: 5}}>
//                                     <Col style={{ backgroundColor:  randomColor(), height: 50, width: 5}}></Col>
//                                   </Grid>
//                                   <Text style={{marginRight: 10}}>{presentation.time}</Text>
//                                 </Left>
//                                 <Body>
//                                   <Text>{presentation.name}</Text>
//                                   <Text note>{presentation.location}</Text>
//                                 </Body>
//                                   <Right>
//                                     <Button small transparent onPress={this.handleSavePress.bind(this, presentation)}>
//                                       <Icon name="ios-add-circle-outline" style={{color: '#428bca'}}/>
//                                     </Button>
//                                   </Right>

