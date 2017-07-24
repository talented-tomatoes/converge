import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Picker, Icon } from 'native-base';

import axios from 'axios';
import DatePicker from './DatePicker.js';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';


const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, placeholder, normalize, multiline}) => {
  console.log('label: ', label)
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} placeholder={placeholder} multiline={multiline}/>
    </Item>
  )
}

class EditScheduleForm extends Component {
  static navigationOptions = {
    title: 'Add A Presentation',
    headerLeft: <Button transparent onPress={() => navigation.navigate('EditSchedule')}><Icon name="menu"/></Button>
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      selectedTime: '',
      selectedSpeakerID: 0,
      speakers: [
        {
          first_name: 'John',
          last_name: 'Doe',
          id: 1
        },
        {
          first_name: 'Jane',
          last_name: 'Doe',
          id: 2
        },
        {
          first_name: 'Jack',
          last_name: 'Frost',
          id: 3
        }
      ]
    }
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    let getAllSpeakersByConferenceIdUrl = SERVER_URL + 'api/speakers/' + this.props.admin.selectedConference.id;
    axios.get(getAllSpeakersByConferenceIdUrl)
      .then( speakers => {
        console.log('speakers: ', speakers.data);
        this.setState({
          speakers: speakers.data
        })
      })
      .catch(err => {
        console.log('Error getting speakers: ', err);
      })
  }

  saveToDB(presentation) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
      let url = SERVER_URL + 'api/AddPresentation';
      let options = presentation;
      console.log('presentation: ', presentation);
      axios.post(url, presentation)
        .then(response => {
          console.log('response : ', response);
          this.props.navigation.navigate('EditSchedule');
        })
        .catch(error => {
          console.log('Error saving presentation: ', error);
        })
    }

  submit(presentation) {
    presentation.speaker_id = this.state.selectedSpeakerID;
    presentation.conference_id = this.props.admin.selectedConference.id;
    presentation.date = this.state.selectedDate;
    presentation.time = this.state.selectedTime;
    this.saveToDB(presentation);
  }

  onSpeakerChange(value) {
    this.setState({
      selectedSpeakerID: value
    });
  }

  onDateChange(value) {
    this.setState({
      selectedDate: value.slice(0,11)
    })
  }

  onTimeChange(value) {
    this.setState({
      selectedTime: value
    })
  }

  render() {
    console.log('props in EditScheduleForm: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Content>
          <Field name="name" component={ renderInput } label="Presentation Name:" placeholder="React Native Best Practices" />
          <Item inlineLabel>
            <Label>Speaker Name: </Label>
            <Picker
                placeholder="Select a speaker"
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedSpeakerID}
                onValueChange={this.onSpeakerChange.bind(this)}
              >
              {
                this.state.speakers.map((speaker, i) => {
                  return <Picker.Item key={i} label={speaker.first_name + ' ' + speaker.last_name} value={speaker.id} />
                })
              }
            </Picker>
          </Item>

          <Item inlineLabel>
            <Label>Date: </Label>
            <DatePicker showIcon={false} onChange={this.onDateChange.bind(this)} minDate={this.props.admin.selectedConference.start_date} maxDate={this.props.admin.selectedConference.end_date} />
          </Item>
          <Item inlineLabel>
            <Label>Time: </Label>
            <DatePicker showIcon={false} mode={'time'} onChange={this.onTimeChange.bind(this)} />
          </Item>

          <Field name="location" component={ renderInput } label="Location:" placeholder="Twin Peaks Room" />
          <Field name="description" component={ renderInput } label="Description:" placeholder="Developing with React Native...." multiline={true} />
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Add Presentation</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    )
  }
}

EditScheduleForm = reduxForm({
  form: 'AddPresentation'
})(EditScheduleForm)

EditScheduleForm = connect(
  state => ({
    admin: state.adminReducer
  })
  )(EditScheduleForm)

export default EditScheduleForm


