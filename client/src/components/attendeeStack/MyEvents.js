import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content } from 'native-base';
import ConferenceListEntry from '../registerStack/ConferenceListEntry.js';

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

    axios.get(`http://localhost:3000/api/join/conferences_users/${this.props.user.id}`)
      .then(response => {
        this.setState({
          conferences: response.data
        });
      });
  }

  render() {

    const conferenceListItems = this.state.conferences.map((conference, i) =>
    <TouchableOpacity key ={i} onPress={() => this.props.navigation.navigate('Home', { navigation: this.props.navigation, conference: conference })}>
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