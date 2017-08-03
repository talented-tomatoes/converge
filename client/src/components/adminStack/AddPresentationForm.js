import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform
} from 'react-native';
import { Container, Button, Right, Grid, Col, List, Card, Thumbnail, Left, CardItem, CheckBox, Body, Input, ListItem, Label, Item, Content, Separator, Text, Footer, FooterTab, Picker, Icon, Title, Toast } from 'native-base';

import axios from 'axios';
import DatePicker from './DatePicker.js';
import convertDateToEnglish from './helpers/convertDateToEnglish';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import randomColor from '../helpers/randomColor';
import AdminStackHeader from './helpers/AdminStackHeader';
import SpeakerPicker from './helpers/SpeakerPicker.js';
import { setPresentationSpeakers, setSpeakerInitialValues } from '../actions/actions.js';


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
      selectedSpeakers: this.props.admin.selectedPresentation.speakers || [],
      datepickerRequired: false
    }
    this.randomColor = randomColor();
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

  saveToDB(presentationAndSpeakerIds) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
      let url = this.state.editMode ? SERVER_URL + 'api/editPresentation/' : SERVER_URL + 'api/AddPresentation';
      console.log('saving presentation: ', presentationAndSpeakerIds);
      axios.post(url, presentationAndSpeakerIds)
        .then(response => {
          if (this.state.editMode) {
            Toast.show({
              text: `${presentationAndSpeakerIds.presentation.name} updated`,
              position: 'bottom',
              type: 'success',
              duration: 1500
           });
          } else if (this.state.editMode) {
            Toast.show({
              text: `${presentationAndSpeakerIds.presentation.name} added`,
              position: 'bottom',
              type: 'success',
              duration: 1500
            });
          }
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
    if (this.state.selectedDate === undefined || this.state.selectedTime === undefined) {
      this.setState({
        datepickerRequired: true
      })
    } else {
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
    //    <Item  name="date" validate={[required]}>
    const { handleSubmit } = this.props;
    console.log('ADMIN PROPS.......', this.props.admin);
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddPresentation"
          leftIcon="arrow-back"
          title={this.props.admin.selectedPresentation.id ? 'Edit' : 'Add'}
          rightIcon={null}
        />
        <Content style={{padding: 10}}>
          <Card style={{flex: 0}}>
              <CardItem>
                <Field name="name" label="Presentation:"validate={[required]}  component={ renderInput }></Field>
              </CardItem>
              <CardItem>

                  <Field name="location" validate={[required]} label="Location:" component={ renderInput } />
              </CardItem>
              <CardItem>
                <Icon name="ios-calendar-outline"/>
                <View style={{position: "absolute", left: 20}}>
                  <DatePicker showIcon={false} onChange={this.onDateChange.bind(this)} minDate={this.props.admin.selectedConference.start_date} maxDate={this.props.admin.selectedConference.end_date} value={this.state.selectedDate} datepickerRequired={this.state.datepickerRequired}/>
                </View>
              </CardItem>
              <CardItem>
                <Icon name="ios-time-outline"/>
                <View style={{position: "absolute", left: 20}}>
                 <DatePicker showIcon={false} mode={'time'} onChange={this.onTimeChange.bind(this)} value={this.state.selectedTime} datepickerRequired={this.state.datepickerRequired}/>
                </View>
              </CardItem>
              <CardItem style={{height: 140}}>
                 <Field name="description" validate={[required]} component={ renderInput } placeholder="Description" multiline={true} />
              </CardItem>
              <Grid style={{ alignSelf: "center", flex: 0}}>
                <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
              </Grid>
          </Card>
          {
            (this.props.admin.speakers.length === 0) ? (
              <Card>
                <Button iconLeft transparent style={{alignSelf: 'center'}} onPress={() => {
                    this.props.dispatch(setSpeakerInitialValues({}))
                    this.props.navigation.navigate('AddSpeakersForm');
                  }}>
                  <Icon name="add" />
                  <Text style={{fontWeight: 'bold'}}>Please Add A Speaker First</Text>
                </Button>
              </Card>
            ) : (
              <View />
            )
          }

          <View>
          <SpeakerPicker />
          </View>
        </Content>
        <Footer>
          <Content style={{backgroundColor: this.randomColor}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
            {
              this.props.admin.selectedPresentation.id ? <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Update Presentation</Text> : <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Add Presentation</Text>
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


