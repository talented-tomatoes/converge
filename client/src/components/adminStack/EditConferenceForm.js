import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon, ListItem, Toast, Left } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import uploadImage from '../registerStack/helpers/uploadImage';
import axios from 'axios';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';
import DatePicker from './DatePicker.js';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { setAdminSelectedConference } from '../actions/actions.js';

const required = value => {
  return value ? undefined  : <Text> Required </Text>
};

const price = (value) => {
  return value && isNaN(Number(value))
         ? <Text> Must be a Number </Text>
         : undefined
};

const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, placeholder, normalize, multiline, meta: { touched, error, warning }}) => {
  console.log('label: ', label)
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

class EditConferenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: '' || this.props.admin.selectedConference.start_date,
      end_date: '' || this.props.admin.selectedConference.end_date,
      start_time: '' || this.props.admin.selectedConference.start_time,
      end_time: '' || this.props.admin.selectedConference.end_time
    }
    this.handleConferenceDelete = this.handleConferenceDelete.bind(this);
  }
  static navigationOptions = {
    title: 'Update Conference Details',
    headerLeft: <Button transparent onPress={() => {navigation.navigate('EditConference')}}><Icon name="menu"/></Button>
  }

  componentDidMount() {
    //console.log('CONFERENCE EDIT FORM LOADED, PROPS ARE: ', this.props)
    this.handleInitialize();
  }

  handleInitialize() {
    // set Values for the pre-load of conference form
    const conferenceValues = {
      start_date: this.props.admin.selectedConference.start_date,
      end_date: this.props.admin.selectedConference.end_date,
      name: this.props.admin.selectedConference.name,
      address: this.props.admin.selectedConference.address,
      logo: this.props.admin.selectedConference.logo,
      // need to stringify the price so that it can be pre-loaded into the field
      ticket_price: JSON.stringify(this.props.admin.selectedConference.ticket_price),
      venue_map: this.props.admin.selectedConference.venue_map,
      banner: this.props.admin.selectedConference.banner,
      details: this.props.admin.selectedConference.details,
      // include the conference ID so that you can edit it in database
      // id: this.props.admin.selectedConference.id
    };
    this.props.initialize(conferenceValues);
  }

  uploadImage(imageType) {
     let options = {
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let options = uploadImage(response.data);
        axios.post(options.url, options.body)
          .then(response => {
            console.log('Response URL: ', response.data.secure_url);
            if (imageType === 'logo') {
              this.setState({logo: response.data.secure_url});
            } else if (imageType === 'venue_map') {
              this.setState({venue_map: response.data.secure_url});
            } else if (imageType === 'banner') {
              this.setState({banner: response.data.secure_url});
            }
          })
          .catch(err => {
            console.log('Error: ', err);
          })
      }
    })
  }

  saveToDB(conference) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    let url = SERVER_URL;
    if (this.props.admin.selectedConference.id === undefined) {
      url += 'api/addConference';
    } else {
      url += 'api/editConference';
    }
    console.log('CONFERENCE INFO ', conference);
    axios.post(url, conference)
      .then(response => {
        // console.log('response from the updated: ', response.data);
        axios.get(SERVER_URL + 'api/conference/' + this.props.admin.selectedConference.id)
          .then(conference => {
            console.log('new conference information: ', conference.data);
            this.props.dispatch(setAdminSelectedConference(conference.data));
          })
          .catch(err => {
            console.log('error: ', err);
          })
        this.props.navigation.navigate('AdminLanding');
      })
      .catch(error => {
        console.log('error:', error.response.data);
        Toast.show({
          text: error.response.data,
          position: 'bottom',
          buttonText: 'Okay',
          type: 'danger'
        });
      })
    }

  submit(conference) {
    conference.user_id = this.props.user.userID;
    conference.start_date = this.state.start_date;
    conference.end_date = this.state.end_date;
    conference.start_time = this.state.start_time;
    conference.end_time = this.state.end_time;
    conference.id = this.props.admin.selectedConference.id;
    conference.logo = this.state.logo;
    conference.banner = this.state.banner;
    conference.venue_map = this.state.venue_map;
    this.saveToDB(conference);
  }

  onStartDateChange(date) {
    this.setState({
      start_date: date
    })
  }

  onEndDateChange(date) {
    this.setState({
      end_date: date
    })
  }

  onStartTimeChange(time) {
    console.log('changing the start time now to ', time);
    this.setState({
      start_time: time
    })
  }

  onEndTimeChange(time) {
    console.log('changing the end time now to ', time);
    this.setState({
      end_time: time
    })
  }

  handleConferenceDelete() {
  let currentConf = this.props.admin.selectedConference;
  axios.delete(`${Config.server.url}api/deleteConference/${currentConf.id}`)
    .then(response => {
      console.log('RESPONSE FROM SERVER ON DELETE CONFERENCE ', response);
      // only navigate when the conference actual deletes
      this.props.navigation.navigate('AdminLanding');
    })
    .catch(err => {
    console.log('error deleting the conference ', err);
  })
    
}

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation={'AdminLanding'}
          leftIcon="arrow-back"
          title={this.props.admin.selectedConference.id ? 'Edit Event' : 'New Event'}
          rightIcon={this.props.admin.selectedConference.id ? 'trash' : ''}
          rightAction={this.handleConferenceDelete} 
        /> 
        <Content>
          <Field name="name" validate={[required]} component={ renderInput } label="Conference Name:" placeholder="SXSW" />
          <Field name="address" validate={[required]} component={ renderInput } label="Address:" placeholder="123 Main St. Anywhere, CA 94111" />
          <ListItem>
            <Text>Start Date: </Text>
            <DatePicker onChange={this.onStartDateChange.bind(this)} value={this.props.admin.selectedConference.start_date} disabled={!!this.props.admin.selectedConference.id}/>
            </ListItem>
          <ListItem>
            <Text>Start Time: </Text>
            <DatePicker onChange={this.onStartTimeChange.bind(this)} value={this.state.start_time} mode='time' disabled={!!this.props.admin.selectedConference.id}/>
            </ListItem>
          <ListItem>
            <Text>End Date:   </Text>
            <DatePicker onChange={this.onEndDateChange.bind(this)} value={this.props.admin.selectedConference.end_date} disabled={!!this.props.admin.selectedConference.id}/>
            </ListItem>
          <ListItem>
            <Text>End Time: </Text>
            <DatePicker onChange={this.onEndTimeChange.bind(this)} mode='time' disabled={!!this.props.admin.selectedConference.id} value={this.props.admin.selectedConference.end_time}/>
            </ListItem>
          <Item inlineLabel>
            <Label>Logo:</Label>
              <Button success small onPress={() => this.uploadImage('logo')}>
                <Text> Upload </Text>
                <Icon name="ios-cloud-upload-outline" />
              </Button>
          </Item>
          <Field name="ticket_price" validate={[required, price]} component={ renderInput } label="Ticket Price:" placeholder="$85.00" keyboardType="numeric" />
          <Item inlineLabel>
            <Label>Venue Map:</Label>
            <Button success small onPress={() => this.uploadImage('venue_map')}>
              <Text> Upload </Text>
              <Icon name="ios-cloud-upload-outline" />
            </Button>
          </Item>
          
          <Item inlineLabel>
            <Label>Banner:</Label>
            <Button success small onPress={() => this.uploadImage('banner')}>
              <Text> Upload </Text>
              <Icon name="ios-cloud-upload-outline" />
            </Button>
          </Item>
          <Field name="details" validate={[required]} component={ renderInput } label="Conference Blurb:" placeholder="SXSW brings musicians and techn ..." multiline={true} />
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>{this.props.admin.selectedConference.id ? 'Update Conference Details' : 'Add New Conference'}</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    );
  }
}

const reduxFormConfig = {
  form: 'EditConferenceForm',
  fields: ['name', 'address', 'logo', 'ticket_price', 'venue_map', 'banner', 'details']
}

EditConferenceForm = reduxForm(reduxFormConfig)(EditConferenceForm)

EditConferenceForm = connect(
  state => ({
    admin: state.adminReducer,
    user: state.userReducer
  }))(EditConferenceForm)

export default EditConferenceForm;