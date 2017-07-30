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
      selectedSpeakers: this.props.selectedSpeakers || {}
    };
    this.setSpeakersAndGoBack = this.setSpeakersAndGoBack.bind(this);
  }

  componentDidMount() {
  }
  
  handleSpeakerPress(speaker) {
    console.log('speaker', speaker);
    var selected = this.state.selectedSpeakers;
    // find speaker of
    if (selected[speaker.id] === undefined) {
      selected[speaker.id] = speaker;
    } else {
      delete selected[speaker.id];
    }
    
    this.setState({
      selectedSpeakers: selected
    }, () => { console.log('speaker toggled: ', speaker.first_name)});
    
    selected = {...this.props.selectedSpeakers}
    console.log('selected: ', selected);

    this.props.dispatch(setPresentationSpeakers(selected));

  }

  setSpeakersAndGoBack() {
    console.log('dispatching these props: ----------, ');
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
    let toggledSpeakers = this.props.admin.speakers.map((speaker, idx)=> {
      return (
        <ListItem key={idx} avatar onPress={this.handleSpeakerPress.bind(this, speaker)}>
          <Left>
            <Thumbnail small source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
          </Left>
          <Body>
            <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
            <Text note>{speaker.job_title}</Text>
          </Body>
          <Right>
            {
              Object.keys(this.state.selectedSpeakers).includes(speaker.id.toString()) ? <Icon name="checkmark" style= {{color: 'green', fontSize: 32}} /> : <Icon name="add" style={{color: 'gray', fontSize: 32}} />          
              
            }
          </Right>
        </ListItem>
      )
    })
      
    
    return (
      <Content>
        <Button full success onPress={this.setSpeakersAndGoBack.bind(this)}>
          <Title style={{fontSize: 13, color: '#FFFFFF'}}>Confirm</Title>
        </Button>
      <Content>
        {toggledSpeakers}
      </Content>



      
      </Content>


    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer,
    selectedSpeakers: state.adminReducer.selectedPresentationSpeakers
  };
};

export default connect(mapStateToProps)(SpeakerPicker);