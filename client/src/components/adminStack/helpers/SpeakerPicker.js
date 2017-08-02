import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem, ListItem, Thumbnail, Card, CardItem } from "native-base";
import SpeakerList from '../../registerStack/SpeakerList.js';
import { connect } from 'react-redux';
import Config from '../../../../../config/config.js';
import { setPresentationSpeakers } from '../../actions/actions.js';
import truncateString from '../../helpers/truncateString';

class SpeakerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: this.props.admin.speakers,
      selectedSpeakers: this.props.selectedSpeakers || {}
    };
  }

  handleSpeakerPress(speaker) {
    var selected = this.state.selectedSpeakers;

    if (selected[speaker.id] === undefined) {
      selected[speaker.id] = speaker;
    } else {
      delete selected[speaker.id];
    }

    this.setState({
      selectedSpeakers: selected
    });

    this.props.dispatch(setPresentationSpeakers(selected));

  }

  render() {
    return (
      <ScrollView style={{height: 140}}>
        {


          this.props.admin.speakers.map((speaker, idx)=> {
            return (
              <Card key={idx}>
                <TouchableOpacity onPress={this.handleSpeakerPress.bind(this, speaker)}>
                  <CardItem header>
                      <Thumbnail small source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
                    <TouchableOpacity style={{marginLeft: 15}} onPress={this.handleSpeakerPress.bind(this, speaker)}>
                    <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
                    <Text note >{truncateString(speaker.job_title)}</Text>
                    </TouchableOpacity>
                    <Right>
                      {
                        Object.keys(this.state.selectedSpeakers).includes(speaker.id.toString()) ? <Icon name="checkmark" style= {{color: 'green', fontSize: 32}} /> : <Icon name="add" style={{color: 'gray', fontSize: 32}} />

                      }
                    </Right>

                  </CardItem>
                </TouchableOpacity>
              </Card>
            )
          })
        }
      </ScrollView>
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