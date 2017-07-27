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
import AdminStackHeader from './helpers/AdminStackHeader';


const required = value => {
  return value ? undefined  : <Text> Required </Text>
};
const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, placeholder, normalize, multiline, meta: { touched, error, warning }}) => {
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} placeholder={placeholder} multiline={multiline}/>
      {touched &&
        (error &&
          <Item error>
            {error}
          </Item>) }
    </Item>
  )
}

const validate = (values) => { 
  const errors = {};
  if (!values.name || values.name.trim() === '') {
    errors.name = <Text>Name Required</Text>;
  }
  return errors;
}

class AddPresentationForm extends Component {
  static navigationOptions = {
    title: 'Add A Presentation',
    headerLeft: <Button transparent onPress={() => navigation.navigate('AddPresentation')}><Icon name="menu"/></Button>
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
          this.props.navigation.navigate('AddPresentation');
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
    console.log('props in AddPresentationForm: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddPresentation"
          leftIcon="arrow-back"
          title="Presentations"
          rightIcon= "trash"
        />
        <Content>
          <Field name="name" validate={[required]}  component={ renderInput } label="Presentation Name:" placeholder="React Native Best Practices" />
          <Item name="speaker" validate={[required]} inlineLabel>
            <Label>Speaker Name: </Label>
            <Picker
                name="speaker" validate={[required]}
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

          <Item inlineLabel name="date" validate={[required]}>
            <Label>Date: </Label>
            <DatePicker showIcon={false} onChange={this.onDateChange.bind(this)} minDate={this.props.admin.selectedConference.start_date} maxDate={this.props.admin.selectedConference.end_date} />
          </Item>
          <Item inlineLabel>
            <Label>Time: </Label>
            <DatePicker showIcon={false} mode={'time'} onChange={this.onTimeChange.bind(this)} />
          </Item>

          <Field name="location" validate={[required]} component={ renderInput } label="Location:" placeholder="Twin Peaks Room" />
          <Field name="description" validate={[required]} component={ renderInput } label="Description:" placeholder="Developing with React Native...." multiline={true} />
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
const reduxFormConfig = {
  form: 'AddPresentation',
  fields: ['name', 'speaker', 'date', 'location', 'description']
}
AddPresentationForm = reduxForm(reduxFormConfig)(AddPresentationForm)

AddPresentationForm = connect(
  state => ({
    admin: state.adminReducer
  })
  )(AddPresentationForm)

export default AddPresentationForm


