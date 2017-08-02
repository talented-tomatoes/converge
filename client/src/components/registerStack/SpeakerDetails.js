import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import randomColor from '../helpers/randomColor.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity, Image, View, ScrollView } from 'react-native';
import { Container, Header, Badge, Icon, Toast, Tab, Tabs, Content, Title, Body, Grid, Col, Row, Right, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import RegisterStackHeader from './helpers/RegisterStackHeader.js'
import { setAttendeeSelectedPresentation } from '../actions/actions.js';


class SpeakerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presentations : []
    }
    this.randomColor = randomColor();
  }

  static navigationOptions = {
    title: 'Speaker Details'
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    axios.get(`${Config.server.url}api/join/presentations_speakers/${params.speaker.id}`)
      .then(response => {
          this.setState({
            presentations: response.data
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleAddToSchedule(presentation) {
    const { params } = this.props.navigation.state;
    if (!params.isUserPaid) {
      Toast.show({
        text: 'Please purchase a ticket first before adding this to your schedule.',
        position: 'bottom',
        buttonText: 'Okay',
        type: 'warning',
        duration: 2000
      })
    } else {
      axios.post(`${Config.server.url}api/join/users_presentations`, { presentation_id: presentation.id, user_id: this.props.user.id })
        .then(response => {
          //TODO: Try to store this in redux?
          if (response.data === 'success') {
            Toast.show({
                text: `Added ${presentation.name} to your schedule`,
                position: 'bottom',
                buttonText: 'Okay',
                type: 'success',
                duration: 1500
            });
          }
          if (response.data === 'already added') {
            Toast.show({
              text: 'Looks like you already added this to your schedule. Please check My Schedule for more details.',
              position: 'bottom',
              buttonText: 'Okay',
              type: 'warning',
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err);
        })

    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <RegisterStackHeader
          leftOnPress={() => this.props.navigation.navigate(params.backPage, { presentation: params.data } )}
          leftIcon="arrow-back"
          title={params.speaker.first_name + ' ' + params.speaker.last_name}
        />
        <Content style={{padding: 10}}>
          <Card style={{flex: 0}}>

              <Content style={{alignSelf: 'center', padding: 10}}>
                <Thumbnail large source={{uri: params.speaker.avatar_url}} style={{borderRadius: 60, height: 120, width: 120, flex: 1}}/>
              </Content>

              <ScrollView style={{height: 140, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
              <Text style={{padding: 10}}>
                {params.speaker.bio}
              </Text>
              </ScrollView>
            <Grid style={{ alignSelf: "center", flex: 0, paddingTop: 10}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Title>Here's where you'll find {params.speaker.first_name + ' ' + params.speaker.last_name}</Title>
              </Body>
            </CardItem>
            <Content>
              {
                this.state.presentations.map((presentation, i) => {

                  return (
                      <List key={i}>
                        <ListItem avatar>
                          <Left>
                            <Grid style={{ alignSelf: "center", flex: 0}}>
                              <Col style={{ backgroundColor: this.randomColor, height: 50, width: 5}}></Col>
                            </Grid>
                            <Text style={{paddingTop: 15, paddingLeft: 5}}>{convertDateToEnglish(presentation.date)}, </Text>
                            <Text style={{paddingTop: 15 }}>{presentation.time}</Text>
                          </Left>
                          <Body>
                            <Text>{presentation.name}</Text>
                            <Text style={{color: 'grey'}}>{presentation.location}</Text>
                          </Body>
                          <Right>
                            <Button transparent onPress={this.handleAddToSchedule.bind(this, presentation)}>
                              <Icon name="ios-calendar-outline" style={{fontSize: 35, color: this.randomColor}}></Icon>
                              <Icon name="ios-add-circle" style={{fontSize: 20, color: this.randomColor, position: 'absolute', left: 29, top: 16}}></Icon>
                            </Button>
                          </Right>
                        </ListItem>
                      </List>
                  )
                })
              }
            </Content>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedConference: state.attendeeReducer,
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(SpeakerDetails);
