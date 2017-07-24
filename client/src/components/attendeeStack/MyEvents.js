import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedConference } from '../actions/actions'
import { TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content } from 'native-base';
import ConferenceListEntry from '../registerStack/ConferenceListEntry.js';
import Config from '../../../../config/config.js';

class MyEvents extends Component {
  static navigationOptions = {
    title: 'My Events'
  };
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

    const conferenceListItems = this.state.conferences.map((conference, i) =>
    <TouchableOpacity key ={i} onPress={this.handleImageOnPress.bind(this, conference)}>
      <ConferenceListEntry conference={conference}/>
    </TouchableOpacity>
    );

    return (
      <Container>
        <Header>
          <Body>
            <Title>My Events</Title>
          </Body>
        </Header>
        <Content>
          {conferenceListItems}
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