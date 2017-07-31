import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem, Grid, Col, Toast } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

// import Redux things
import { connect } from 'react-redux';
import { setSpeakerInitialValues } from '../actions/actions.js';
import Config from '../../../../config/config.js';



class SpeakersListEntry extends Component {
  constructor(props) {
    super(props);
  }

  handleSpeakerPress() {
    this.props.dispatch(setSpeakerInitialValues(this.props.speaker));
    this.props.navigation.navigate('AddSpeakersForm', {editMode: true});
  }

  handleDeleteSpeakerFromConference(speaker) {
    console.log('speaker: ', speaker);
    axios.delete(`${Config.server.url}api/deleteSpeaker/${speaker.id}`)
      .then(response => {
        Toast.show({
          text: speaker.first_name + ' ' + speaker.last_name + ' deleted',
          position: 'bottom',
          buttonText: 'X',
          type: 'warning',
          duration: 2000
        })
        this.props.navigation.navigate('AddSpeakers');
      })
      .catch(err => {
        console.log('error deleting the conference ', err);
        Toast.show({
          text: `Error deleting ${currentSpeaker.first_name} ${currentSpeaker.last_name} right now...`,
          position: 'bottom',
          buttonText: 'X',
          type: 'danger',
          duration: 2000
        });
    })
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={this.handleSpeakerPress.bind(this)}>
        <CardItem header>
            <Thumbnail small source={{ uri: this.props.speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
          <TouchableOpacity style={{marginLeft: 15}} onPress={this.handleSpeakerPress.bind(this)}>
          <Text>{this.props.speaker.first_name + ' ' + this.props.speaker.last_name}</Text>
          <Text note>{this.props.speaker.job_title}</Text>
          </TouchableOpacity>
          <Right>
            <Button transparent small onPress={() => this.handleDeleteSpeakerFromConference(this.props.speaker)}>
              <Icon name="trash" style={{color: '#428bca'}}/>
            </Button>
          </Right>

        </CardItem>
        </TouchableOpacity>

      </Card>
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

