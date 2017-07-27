import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { Image } from 'react-native';

// import Redux things
import { connect } from 'react-redux';
import { setSpeakerInitialValues } from '../actions/actions.js';


class SpeakersListEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // onPress I need to go to the edit page of the speaker
      <ListItem avatar onPress={() => {
        // set the redux store of ADMIN to have the speaker's values
        this.props.dispatch(setSpeakerInitialValues(this.props.speaker));
        // navigate to the AddSpeakersForm
        this.props.navigation.navigate('AddSpeakersForm'); 
      }}>
        <Left>
          <Thumbnail source={{ uri: this.props.speaker.avatar_url }} />
          </Left>
        <Body>
          <Text>{this.props.speaker.first_name} {this.props.speaker.last_name}</Text>
          <Text note>{this.props.speaker.job_title}</Text>
          </Body>
        </ListItem>
    );
  }

}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    speakerValues: state.adminReducer
  };
};

export default connect(mapStateToProps)(SpeakersListEntry);
