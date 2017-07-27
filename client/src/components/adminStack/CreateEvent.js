import React, { Component } from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Header, Footer, Right, Body, Left, Button, Content, Text, Card, Icon, Title, Item, Input, Label} from 'native-base';
import DatePicker from './DatePicker.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { decorateUserWithDBUserID  } from '../actions/actions';
import Config from '../../../../config/config.js';
import axios from 'axios';
import AdminStackHeader from './helpers/AdminStackHeader';

const required = (value) => {
  console.log('required!!');
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

const price = (value) => {
  return value && isNaN(Number(value))
         ? <Text> Must be a Number </Text>
         : undefined
};

class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
  constructor(props) {
    super(props)

    this.state = {
      start_date: '',
      end_date: '',
      user_id: this.props.user.userID
    }
  }

  componentDidMount() {
    console.log('CreateEvent!!!!!');
  }

  onStartDateChangeDate(date) {
    console.log('changing the start date now to ', date);
    this.setState({
      startDate: date
    })
  }

  onEndDateChangeDate(date) {
    console.log('changing the end date now to ', date);
    this.setState({
      endDate: date
    })
  }

  saveToDB(inputProps) {
    // console.log('in saveToDB: ', conference);
    let conference = {};
    conference.start_date = this.state.startDate;
    conference.end_date = this.state.endDate;
    console.log('in saveToDB: ', inputProps);
    conference.address = inputProps.location;
    conference.name = inputProps.name;
    conference.banner = 'https://d3i6fh83elv35t.cloudfront.net/newshour/wp-content/uploads/2015/08/RTR3UIDN-1024x683.jpg';
    conference.venue_map ='https://s-media-cache-ak0.pinimg.com/736x/b1/a0/51/b1a051ec5a60c4572771f6e288d33b5c.jpg';
    conference.details = inputProps.details;
    conference.ticket_price = inputProps.price;
    conference.logo = 'https://s3.amazonaws.com/BURC_Pages/downloads/a-smile_color.jpg';
    conference.user_id = this.state.user_id;

    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.post(SERVER_URL + 'api/addConference', conference)
      .then((response) => {
        console.log('this.props: ', this.props);
        console.log(response);
        // navigate to the the admin landing
        this.props.navigation.navigate('AdminLanding')
      })
      .catch(function(err) {
        console.log('error in getting host conference: ', err);
      });
  }
   

  submit(conference) {

    this.saveToDB(conference);
  }

  render() {
    console.log('this.props in create event: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="arrow-back"
          title="Conference"
          rightNavigation="CreateEvent"
          rightIcon= "add"
        />
        <Content>
          <Text> Start Date: </Text>
          <DatePicker onChange={this.onStartDateChangeDate.bind(this)} />
          <Text> End Date: </Text>
          <DatePicker onChange={this.onEndDateChangeDate.bind(this)} />

        <Card>
          
           <Item>
            <Field name="name" validate={[required]} component={ renderInput }
              placeholder="Name of Event"
              
              />
            </Item>
          <Item>
            <Field name="location" validate={[required]} component={ renderInput }
              placeholder="Location of Event"
             /> 

             </Item> 
            <Item>
              <Field name="map" validate={[required]} component={ renderInput }
                placeholder="upload venue map"
                ></Field>
              </Item>
            <Item>
              <Field name="banner" validate={[required]} component={ renderInput } placeholder="upload banner"></Field>
              </Item>
            <Item>
              <Field name="logo" validate={[required]}  component={ renderInput } placeholder="upload logo"></Field>
              </Item>
            <Item>
              <Field name="details" validate={[required]} component={ renderInput }
                placeholder="upload event details"
               
                ></Field>
              </Item>
            <Item>
              <Field name="price" validate={[required, price]} component={ renderInput }
                placeholder="ticket price"
              
                ></Field>
              </Item>
          </Card>
        </Content>
        <TouchableOpacity onPress={handleSubmit(this.submit.bind(this))}>
        <Footer style={{backgroundColor: '#428bca'}}>

              <Title style={{fontSize: 15, fontWeight: 'bold', color: 'white', alignSelf: 'center'}}>Create This Event</Title>
        </Footer>
        </TouchableOpacity>
        </Container>
    )
  }

}

NewEvent = reduxForm({
  form: 'AddEvent',
  fields: ['name', 'location', 'map', 'banner', 'logo', 'details']
})(NewEvent)

NewEvent = connect(
  state => ({
    user: state.userReducer,
    events: state.adminReducer
  })
)(NewEvent)

export default NewEvent