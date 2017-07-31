import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform
} from 'react-native';
import { Container, Button, Right, CheckBox, Body, Input, ListItem, Label, Item, Content, Separator, Text, Footer, FooterTab, Picker, Icon, Title } from 'native-base';

import axios from 'axios';
import DatePicker from './DatePicker.js';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';
import SpeakerPicker from './helpers/SpeakerPicker.js';
import { setPresentationSpeakers } from '../actions/actions.js';


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
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.navigation.state.params !== undefined ? true : false,
      selectedDate: this.props.admin.selectedPresentation.date,
      selectedTime: this.props.admin.selectedPresentation.time,
      selectedSpeakerID: 0,
      selectedSpeakers: this.props.admin.selectedPresentation.speakers || []
    }
  }

  static navigationOptions = {
    title: 'Add A Presentation',
    headerLeft: <Button transparent onPress={() => navigation.navigate('AddPresentation')}><Icon name="menu"/></Button>
  }

  componentDidMount() {
    // do the pre-load of values
    this.handleInitialize();

    var allSpeakers = this.props.admin.speakers || [];
    var checkedSpeakers = {};
    if (this.props.admin.selectedPresentation.speakers !== undefined) {
      for (var i = 0; i < this.props.admin.selectedPresentation.speakers.length; i++) {
        var currentSpeaker = this.props.admin.selectedPresentation.speakers[i];
        for (var j = 0; j < allSpeakers; j++) {
          if (currentSpeaker.id === allSpeakers[j].id) {
            checkedSpeakers[j] = true;
          }
        }
      }
    }
    // this.props.dispatch(setPresentationSpeakers(checkedSpeakers));

  }

  handleInitialize() {
    // set Values for the pre-load
    const presentationValues = {
      name: this.props.admin.selectedPresentation.name,
      description: this.props.admin.selectedPresentation.description,
      date: this.props.admin.selectedPresentation.date,
      time: this.props.admin.selectedPresentation.time,
      location: this.props.admin.selectedPresentation.location,
      conference_id: this.props.admin.selectedPresentation.conference_id
    };
    this.props.initialize(presentationValues);
  }

  saveToDB(presentation) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
      let url = this.state.editMode ? SERVER_URL + 'api/editPresentation/' : SERVER_URL + 'api/AddPresentation';
      console.log('saving presentation: ', presentation);
      axios.post(url, presentation)
        .then(response => {
          this.props.navigation.navigate('AddPresentation');
        })
        .catch(error => {
          console.log('Error saving presentation: ', error);
        })
    }

  handlePresentationSpeakers(selectedSpeakers) {
    this.setState({
      selectedSpeakers
    })
  }

  submit(presentation) {
    presentation.id = this.props.admin.selectedPresentation.id;
    presentation.conference_id = this.props.admin.selectedConference.id;
    presentation.date = this.state.selectedDate;
    presentation.time = this.state.selectedTime;
    let speakerIds = Object.keys(this.props.selectedSpeakers).map(id => Number(id));
    let data = {
      presentation: presentation,
      speakerIds: speakerIds,
      speakers: this.props.selectedSpeakers
    }
    this.saveToDB(data);
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

  handleCheckBoxPress(id) {
    if (this.state.selectedSpeakers[id] === undefined) {
      this.state.selectedSpeakers[id] = true;
    } else {
      this.state.selectedSpeakers[id] = !this.state.selectedSpeakers[id]
    }
    this.setState({
      selectedSpeakers: this.state.selectedSpeakers
    })
  }

  makeSelectedSpeakersList() {
    var selected = this.props.selectedSpeakers || {};

    var output = [];
    for (var key in selected) {
      output.push(<Text>{selected[key].first_name} {selected[key].last_name}</Text>)
    }
    return output;
  }

  render() {
    // console.log('props in AddPresentationForm: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddPresentation"
          leftIcon="arrow-back"
          title="Presentations"
          rightIcon={null}
        />
        <Content>
          <Field name="name" validate={[required]}  component={ renderInput } label="Presentation Name:"/>
          <Item inlineLabel name="date" validate={[required]}>
            <Label>Date: </Label>
            <DatePicker showIcon={false} onChange={this.onDateChange.bind(this)} minDate={this.props.admin.selectedConference.start_date} maxDate={this.props.admin.selectedConference.end_date} value={this.state.selectedDate}/>
          </Item>
          <Item inlineLabel>
            <Label>Time: </Label>
            <DatePicker showIcon={false} mode={'time'} onChange={this.onTimeChange.bind(this)} value={this.state.selectedTime}/>
          </Item>

          <Field name="location" validate={[required]} component={ renderInput } label="Location:"/>
          <Field name="description" validate={[required]} component={ renderInput } label="Description:" multiline={true} />
          <Title>Choose your Speakers</Title>
            <Content>
            <SpeakerPicker />
            {/* {this.makeSelectedSpeakersList()} */}
            </Content>
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
            {
              this.state.editMode ? <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Update Presentation</Text> : <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Add Presentation</Text>
            }
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
    admin: state.adminReducer,
    selectedSpeakers: state.adminReducer.selectedPresentationSpeakers
  })
  )(AddPresentationForm)

export default AddPresentationForm


