import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon, ListItem } from 'native-base';
// import UserSwiperFooter from './helpers/UserSwiperFooter';
// import ImagePicker from 'react-native-image-picker';
// import Swiper from 'react-native-swiper';

import axios from 'axios';
import Config from '../../../../../config/config.js';
import AdminStackHeader from '../helpers/AdminStackHeader';
import DatePicker from '../DatePicker.js';

// need initialize to initialize the form with some data if it exists
import { Field, reduxForm, initialize } from 'redux-form';
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

class EditConferenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: '',
      end_date: '', // find a way to get the date in here from the redux store (should be a string at the moment)
    }
  }
  static navigationOptions = {
    title: 'Update Conference Details',
    headerLeft: <Button transparent onPress={() => navigation.navigate('EditConference')}><Icon name="menu"/></Button>
  }

  componentDidMount() {
    // do the pre-load of values
    console.log('CONFERENCE EDIT FORM LOADED, PROPS ARE: ', this.props)
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
      // remember to Number() it when sending the data back to the server
      ticket_price: JSON.stringify(this.props.admin.selectedConference.ticket_price),
      venue_map: this.props.admin.selectedConference.venue_map,
      banner: this.props.admin.selectedConference.banner,
      details: this.props.admin.selectedConference.details,
      // include the conference ID so that you can edit it in database
      // id: this.props.admin.selectedConference.id
    };
    this.props.initialize(conferenceValues);
  }


  saveToDB(conference) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    if (this.props.admin.selectedConference.id === undefined) {
      let url = SERVER_URL + 'api/addConference';
    } else {
      let url = SERVER_URL + 'api/editConference';
    }

    axios.post(url, conference)
      .then(response => {
        console.log('response : ', response);
        this.props.navigation.navigate('EditConference');
      })
      .catch(error => {
        console.log('error: ', error);
      })
    }

  submit(conference) {
    // conference.user_id = null;
    conference.start_date = this.state.start_date;
    conference.end_date = this.state.end_date;
    conference.ticket_price = Number(conference.ticket_price);
    this.saveToDB(conference);
    console.log('values in EditConferenceForm: ', conference);
  }

  onStartDateChange(date) {
    console.log('changing the start date now to ', date);
    this.setState({
      startDate: date
    })
  }

  onEndDateChange(date) {
    console.log('changing the end date now to ', date);
    this.setState({
      endDate: date
    })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="EditConference"
          leftIcon="arrow-back"
          title={this.props.admin.selectedConference.id ? 'Edit Event' : 'New Event'}
          rightIcon={this.props.admin.selectedConference.id ? 'trash' : ''}
        />
        <Content>
          <Field name="name" component={ renderInput } label="Conference Name:" placeholder="SXSW" />
          <Field name="address" component={ renderInput } label="Address:" placeholder="123 Main St. Anywhere, CA 94111" />
          <ListItem>
            <Text>Start Date: </Text>
            <DatePicker onChange={this.onStartDateChange.bind(this)} date={this.props.admin.selectedConference.start_date}/>
            </ListItem>
          <ListItem>
            <Text>End Date:   </Text>
            <DatePicker onChange={this.onEndDateChange.bind(this)} date={this.props.admin.selectedConference.end_date}/>
            </ListItem>
          {/* <Text> Start Date: <DatePicker /> </Text> */}
          {/* <Text> End Date: </Text> */}
          {/* <Field name="start_date" component={ DatePicker } label="Start Date:" placeholder="7/4/17" />
          <Field name="end_date" component={ renderInput } label="End Date:" placeholder="7/5/17" /> */}
          <Field name="logo" component={ renderInput } label="Logo URL:" placeholder="http://myCompanyLogo.jpg" />
          <Field name="ticket_price" component={ renderInput } label="Ticket Price:" placeholder="$85.00" keyboardType="numeric" />
          <Field name="venue_map" component={ renderInput } label="Venue Map URL:" placeholder="http://venueMap.jpg" />
          <Field name="banner" component={ renderInput } label="Banner URL:" placeholder="http://banner.jpg" />
          <Field name="details" component={ renderInput } label="Conference Blurb:" placeholder="SXSW brings musicians and techn ..." multiline={true} />
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Update Conference Details</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    )
  }
}

EditConferenceForm = reduxForm({
  form: 'EditConferenceForm'
})(EditConferenceForm)


EditConferenceForm = connect(
  state => ({
    admin: state.adminReducer
  }))(EditConferenceForm)

// // REDUX THINGS
// const mapStateToProps = (state) => {
//   return {
//     admin: state.adminReducer
//   };
// };

export default EditConferenceForm;


