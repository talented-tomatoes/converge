import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Picker } from 'native-base';

import axios from 'axios';
import DatePicker from './DatePicker.js';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


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
    header: null,
    headerTruncatedBackTitle: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedSpeakerID: 'Select A Speaker',
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
    let getAllSpeakersByConferenceIdUrl = 'http://localhost:3000/api/speakers/' + this.props.admin.currentConfID;
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
      let url = 'http://localhost:3000/api/AddPresentation';
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
    presentation.conference_id = this.props.admin.currentConfID;
    this.saveToDB(presentation);
  }

  onValueChange(value) {
    this.setState({
      selectedSpeakerID: value
    });
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
                onValueChange={this.onValueChange.bind(this)}
              >
              {
                this.state.speakers.map((speaker, i) => {
                  return <Picker.Item key={i} label={speaker.first_name + ' ' + speaker.last_name} value={speaker.id} />
                })
              }
            </Picker>
          </Item>

          <Field name="date" component={ renderInput } label="Date:" placeholder="7/04/17" keyboardType="numeric" />

          <Field name="time" component={ renderInput } label="Time:" placeholder="3:30 PM" keyboardType="numeric" />
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


