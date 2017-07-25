import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedConference } from '../actions/actions'
import { TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content } from 'native-base';
import ConferenceListEntry from '../registerStack/ConferenceListEntry.js';
import Config from '../../../../config/config.js';
import AttendeeStackHeader from './helpers/AttendeeStackHeader';

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  componentDidMount() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + `api/join/conferences_users/${this.props.user.id}`)
      .then(response => {
        this.setState({
          conferences: response.data
        });
      });
  }

  handleImageOnPress(conference) {
    this.props.dispatch(setSelectedConference(conference));
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container>
        <AttendeeStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="menu"
          title="My Events"
          rightNavigation="ConferenceList"
          rightIcon= "add"
        />
        <Content>
          {
            this.state.conferences.map((conference, i) => {
              return (
                <TouchableOpacity key={i} onPress={this.handleImageOnPress.bind(this, conference)}>
                  <ConferenceListEntry conference={conference}/>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(MyEvents);