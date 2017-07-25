import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon } from 'native-base';
// import UserSwiperFooter from './helpers/UserSwiperFooter';

// import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
// import Swiper from 'react-native-swiper';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';


import { Field, reduxForm } from 'redux-form';


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
  static navigationOptions = {
    title: 'Update Conference Details',
    headerLeft: <Button transparent onPress={() => navigation.navigate('EditConference')}><Icon name="menu"/></Button>
  }
  constructor(props) {
    super(props);
    this.state = {
      // isAttendee: true,
      // avatarSource: '',
    }
  }

  saveToDB(conference) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
      let url = SERVER_URL + 'api/addConference';
      let options = conference;
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
    conference.user_id = null;
    this.saveToDB(conference);
    console.log('values in EditConferenceForm: ', conference);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="EditConference"
          leftIcon="arrow-back"
          title="Edit Details"
          rightIcon= "trash"
        />
        <Content>
          <Field name="name" component={ renderInput } label="Conference Name:" placeholder="SXSW" />
          <Field name="address" component={ renderInput } label="Address:" placeholder="123 Main St. Anywhere, CA 94111" />
          <Field name="start_date" component={ renderInput } label="Start Date:" placeholder="7/4/17" />
          <Field name="end_date" component={ renderInput } label="End Date:" placeholder="7/5/17" />
          <Field name="logo" component={ renderInput } label="Logo URL:" placeholder="http://myCompanyLogo.jpg" />
          <Field name="avatar_url" component={ renderInput } label="Speaker Profile Picture URL:" placeholder="http://myProfilePicture.jpg" />
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

export default reduxForm({
  form: 'EditConferenceForm'
})(EditConferenceForm)


