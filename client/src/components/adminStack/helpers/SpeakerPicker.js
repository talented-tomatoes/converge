import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem, ListItem, Thumbnail } from "native-base";
import SpeakerList from '../../registerStack/SpeakerList.js';
import { connect } from 'react-redux';
import Config from '../../../../../config/config.js';
import axios from 'axios';
import { setPresentationSpeakers } from '../../actions/actions.js';


class SpeakerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: this.props.admin.speakers,
      selectedSpeakers: this.props.admin.presentationSpeakers || {}
    };
    this.setSpeakersAndGoBack = this.setSpeakersAndGoBack.bind(this);
  }

  componentDidMount() {
  }
  
  handleSpeakerPress(idx) {
    console.log('this', this);
    var selected = this.state.selectedSpeakers;
    // find idx of
    if (selected[idx] === undefined) {
      selected[idx] = this.state.speakers[idx];
    } else {
      delete selected[idx];
    }
    
    this.setState({
      selectedSpeakers: selected
    }, function() { console.log('setting selectedSpeakers ', this.state.selectedSpeakers)});
  }

  setSpeakersAndGoBack() {
    this.props.dispatch(setPresentationSpeakers(this.state.selectedSpeakers));
    this.props.navigation.navigate('AddPresentationForm');
  }

  speakerIDChecker(speaker) {
    if (this.props.admin.selectedPresentation.speakers === undefined) {
      return false;
    }
    for (var i = 0; i < this.props.admin.selectedPresentation.speakers.length; i++) {
      if (speaker.id === this.props.admin.selectedPresentation.speakers[i].id) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <Content>
      <Header style={{ backgroundColor: "#f44242" }}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('AddPresentationForm')}>
            <Icon name="arrow-back" style={{ color: "#fff" }} />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ color: "#fff" }}>Speaker List</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.setSpeakersAndGoBack}>
            <Text style={{fontSize: 13, color: '#FFFFFF'}}>Confirm</Text>
          </Button>
        </Right> 
      </Header>
      <Content>
      {this.props.admin.speakers.map((speaker, idx)=> {
        return (
          <ListItem key={idx} avatar onPress={this.handleSpeakerPress.bind(this, idx)}>
            <Left>
              <Thumbnail small source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
            </Left>
            <Body>
              <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
              <Text note>{speaker.job_title}</Text>
            </Body>
            <Right>
              {!!this.state.selectedSpeakers[idx] ? <Icon name="checkmark" style= {{color: 'green', fontSize: 32}}></Icon> : <Icon name="add" style={{color: 'gray', fontSize: 32}}></Icon>}
              </Right>
          </ListItem>
        );
      })}
        </Content>



      
      </Content>


    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer
  };
};

export default connect(mapStateToProps)(SpeakerPicker);