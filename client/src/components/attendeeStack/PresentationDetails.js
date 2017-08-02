import axios from 'axios';
import Config from '../../../../config/config.js';
import React, { Component } from 'react';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish'
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { Drawer, Container, Header, Toast, Badge, Title, Col, Grid, List, Content, Card, CardItem, ListItem, Thumbnail, Body, Text, Right, Left, Icon, Button } from 'native-base';
import AttendeeConferenceHeader from './helpers/AttendeeConferenceHeader.js'
import AttendeeConferenceFooter from './helpers/AttendeeConferenceFooter.js';
import randomColor from '../helpers/randomColor';
import SpeakerListEntry from '../registerStack/SpeakerListEntry';


class PresentationsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speakers: []
    }
    this.randomColor = randomColor();
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    axios.get(`${Config.server.url}api/speakers/presentation/${params.presentation.id}`)
      .then(response => {
        this.setState({
          speakers: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSavePress(presentation) {

    axios.post(`${Config.server.url}api/join/users_presentations`, { presentation_id: presentation.id, user_id: this.props.user.id })
      .then(response => {
        //TODO: Try to store this in redux?
        if (response.data === 'success') {
          Toast.show({
              text: `Added ${presentation.name} to your schedule`,
              position: 'bottom',
              buttonText: 'X',
              type: 'success',
              duration: 2000
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
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <AttendeeConferenceHeader
          leftOnPress={() => this.props.navigation.goBack()}
          leftIcon="arrow-back"
          title="Presentation"
        />
          <Content style={{padding: 10}}>
            <Card style={{flex: 0}}>
              <CardItem header>
                <Thumbnail square source={{uri: this.props.conference.logo}} />
                <Body>
                <Text style={{fontWeight: 'bold', padding: 10}}>{params.presentation.name}</Text>
                </Body>
                  <Button transparent onPress={this.handleSavePress.bind(this, params.presentation)}>
                    <Icon name="ios-calendar-outline" style={{fontSize: 35, color: this.randomColor, paddingTop: 10}}></Icon>
                    <Icon name="ios-add-circle" style={{fontSize: 20, color: this.randomColor, position: 'absolute', left: 29, top: 20}}></Icon>
                  </Button>
              </CardItem>
              <List style={{paddingRight: 20}}>
                <ListItem icon>
                  <Left>
                    <Icon name="ios-map-outline"/>
                  </Left>
                  <Body>
                   <Text>Location: {params.presentation.location}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Icon name="ios-calendar-outline"/>
                  </Left>
                  <Body>
                   <Text>Date: {convertDateToEnglish(params.presentation.date) + ', ' + params.presentation.date.substring(0,4)}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Icon name="ios-time-outline"/>
                  </Left>
                  <Body>
                     <Text>Time: {params.presentation.time}</Text>
                  </Body>
                </ListItem>
              </List>
              <CardItem>
                <ScrollView style={{height: 140}}>
                  <Text>{params.presentation.description}</Text>
                </ScrollView>
              </CardItem>
              <Grid style={{ alignSelf: "center", flex: 0}}>
                <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
              </Grid>
            </Card>
            <Content >
              {
                this.state.speakers.map((speaker, i) => {
                  return (
                    <Card key={i}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', { backPage: 'PresentationDetails', speaker: speaker, data: params.presentation, isUserPaid: true })}>
                      <CardItem header>
                          <Thumbnail small source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
                          <TouchableOpacity style={{marginLeft: 15}} onPress={() => this.props.navigation.navigate('SpeakerDetails', { backPage: 'PresentationDetails', speaker: speaker, data: params.presentation })}>
                            <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
                            <Text note>{speaker.job_title}</Text>
                          </TouchableOpacity>
                        </CardItem>
                      </TouchableOpacity>
                    </Card>
                  )
                })
              }
            </Content>
          </Content>
        <AttendeeConferenceFooter navigation={this.props.navigation}></AttendeeConferenceFooter>
    </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.attendeeReducer,
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(PresentationsDetails);