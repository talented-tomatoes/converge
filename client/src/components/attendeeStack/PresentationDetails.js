import axios from 'axios';
import Config from '../../../../config/config.js';
import React, { Component } from 'react';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish'
import { connect } from 'react-redux';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { Drawer, Container, Header, Badge, Title, Col, Grid, List, Content, Card, CardItem, ListItem, Thumbnail, Body, Text, Right, Left, Icon, Button } from 'native-base';
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

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <AttendeeConferenceHeader
          leftOnPress={() => this.props.navigation.navigate('MasterSchedule')}
          leftIcon="arrow-back"
          title="Presentation"
        />
          <Content style={{padding: 10}}>
            <Card style={{flex: 0}}>
              <CardItem header>
                <Thumbnail square source={{uri: this.props.conference.logo}} />
                <Text style={{fontWeight: 'bold', paddingLeft: 15}}>{params.presentation.name}</Text>
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
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails', { backPage: 'PresentationDetails', speaker: speaker, data: params.presentation })}>
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
    conference: state.attendeeReducer
  }
}

export default connect(mapStateToProps)(PresentationsDetails);