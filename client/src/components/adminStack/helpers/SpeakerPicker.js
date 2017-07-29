import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem, ListItem, Thumbnail } from "native-base";
import SpeakerList from '../../registerStack/SpeakerList.js';
import { connect } from 'react-redux';
import Config from '../../../../../config/config.js';
import axios from 'axios';


class SpeakerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: this.props.admin.speakers,
      selected: []
    };
  }

  componentDidMount() {
    // for (let i = 0; i < this.props.admin.speakers.length; i++) {
    //   if (this.state.speakers[i].)
    // }
  }


  // on pressing the speaker, trigger a check mark
  onChangeSpeakers(value) {
    this.setState({
      selectedSpeakers: value || []
    });
  }
  
  handleSpeakerPress(speaker) {
    this.setState({
      
    });
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
          <Button transparent onPress={this.onChangeSpeakers.bind(this)}>
            <Text style={{fontSize: 13, color: '#FFFFFF'}}>Confirm</Text>
          </Button>
        </Right> 
      </Header>
      <Content>
      {this.state.speakers.map((speaker, idx)=> {
        return (
          <ListItem avatar onPress={() => this.setState({ speaker })}>
            <Left>
              <Thumbnail small source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
            </Left>
            <Body>
              <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
              <Text note>{speaker.job_title}</Text>
            </Body>
            <Right>
              {this.state.speakers[idx]["selected"] ? <Icon name="checkmark"></Icon> : <Icon name="add"></Icon>}
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