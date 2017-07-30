import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform
} from 'react-native';
import { Container, Button, Right, CheckBox, Body, Input, ListItem, Label, Item, Content, Separator, Text, Footer, FooterTab, Picker, Icon } from 'native-base';

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
      selectedDate: '',
      selectedTime: '',
      selectedSpeakerID: 0,
      selectedSpeakers: this.props.admin.selectedPresentation.speakers || []

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
    this.submit = this.submit.bind(this);
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
    // convert this.props.admin.selectedPresentation = 
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
    this.props.dispatch(setPresentationSpeakers(checkedSpeakers));

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
      let url = SERVER_URL + 'api/AddPresentation';
      let data = {};
      data.presentation = presentation;
      data.speakers = this.props.admin.selectedSpeakers;
      console.log('presentation: ', presentation);
      axios.post(url, data)
        .then(response => {
          console.log('response : ', response);
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
    var selected = this.props.admin.presentationSpeakers || {};

    var output = [];
    for (var key in selected) {
      output.push(<Text>{selected[key].first_name} {selected[key].last_name}</Text>)
    }
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
          <Item inlineLabel name="date" validate={[required]}>
            <Label>Date: </Label>
            <DatePicker showIcon={false} onChange={this.onDateChange.bind(this)} minDate={this.props.admin.selectedConference.start_date} maxDate={this.props.admin.selectedConference.end_date} value={this.props.admin.selectedPresentation.date}/>
          </Item>
          <Item inlineLabel>
            <Label>Time: </Label>
            <DatePicker showIcon={false} mode={'time'} onChange={this.onTimeChange.bind(this)} value={this.props.admin.selectedPresentation.time}/>
          </Item>

          <Field name="location" validate={[required]} component={ renderInput } label="Location:" placeholder="Twin Peaks Room" />
          <Field name="description" validate={[required]} component={ renderInput } label="Description:" placeholder="Developing with React Native...." multiline={true} />
          <ListItem onPress={() => this.props.navigation.navigate('SpeakerPicker')}> 
            
            {!!this.props.admin.selectedSpeakers ? <Text>Tap to add speakers to this presentation</Text> : <Text> Tap here to change speakers </Text>}
            <Content>
            {this.makeSelectedSpeakersList()}
            </Content>
             </ListItem> 
        
           {/* <Content>
             {
               this.state.speakers.map((speaker, i) => {
                 return <ListItem key={i}>
                          <CheckBox onPress={this.handleCheckBoxPress.bind(this, speaker.id)} checked={this.state.selectedSpeakers[speaker.id]}/>
                          <Body>
                            <Text>{speaker.first_name + ' ' + speaker.last_name}</Text>
                          </Body>
                        </ListItem>
               })
             }
           </Content> */}
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


