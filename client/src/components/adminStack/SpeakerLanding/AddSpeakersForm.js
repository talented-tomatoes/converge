import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon } from 'native-base';
import axios from 'axios';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';

import Config from '../../../../../config/config.js';
import AdminStackHeader from '../helpers/AdminStackHeader.js';



const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, placeholder, normalize, multiline}) => {
  console.log('label: ', onChange)
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} placeholder={placeholder} multiline={multiline}/>
    </Item>
  )
}

class AddSpeakersForm extends Component {
  static navigationOptions = {
    title: 'Add A Speaker',
    headerLeft: <Button transparent onPress={() => navigation.navigate('AddSpeakers')}><Icon name="menu"/></Button>
  }
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {
    // do the pre-load of values
    this.handleInitialize();
  }

  handleInitialize() {
    // set Values for the pre-load
    const speakerValues = {
      first_name: this.props.admin.speakerValues.first_name,
      last_name: this.props.admin.speakerValues.last_name,
      job_title: this.props.admin.speakerValues.job_title,
      email: this.props.admin.speakerValues.email,
      linkedin_id: this.props.admin.speakerValues.linkedin_id,
      avatar_url: this.props.admin.speakerValues.avatar_url,
      bio: this.props.admin.speakerValues.bio,
      id: this.props.admin.speakerValues.id
    };
    this.props.initialize(speakerValues);
  }


  saveToDB(speaker) {
    // base URL
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    
    // change URL depending on whether or not how they got to the page
    if (this.props.admin.speakerValues.id === undefined) {
      url = SERVER_URL + 'api/addSpeaker';
    } else {
      url = SERVER_URL + 'api/editSpeaker';
    }
    // console.log('URLLLLLL', url);
    // let options = speaker;
    speaker.conference_id = this.props.admin.currentConfID;

    // console.log(' SPEAKER INFORMATION, ', speaker)

    axios.post(url, speaker)
      .then(response => {
        console.log('response : ', response);
        // go back to the the EditSpeaker's landing page on success
        this.props.navigation.navigate('AddSpeakers');
      })
      .catch(error => {
        console.log('error saving speaker to the database: ', error);
      })
    }

  submit(speaker) {
    speaker.conference_id = null;
    this.saveToDB(speaker);
    console.log('values in AddSpeakersForm: ', speaker);
  }

  render() {
    // console.log('props', this.props.admin);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddSpeakers"
          leftIcon="arrow-back"
          title="Speakers"
          rightIcon={!!this.props.admin.speakerValues.id ? "trash": ""}
        />
        <Content>
          <Field name="first_name" component={ renderInput } label="First Name:" placeholder="John" />
          <Field name="last_name" component={ renderInput } label="Last Name:" placeholder="Doe" />
          <Field name="job_title" component={ renderInput } label="Job Title:" placeholder="Director of Engineering" />
          <Field name="email" component={ renderInput } label="Email:" placeholder="johndoe123@gmail.com" />
          <Field name="linkedin_id" component={ renderInput } label="Linked In URL:" placeholder="http://linkedin.com/in/johndoe123" />
          <Field name="avatar_url" component={ renderInput } label="Speaker Profile Picture:" placeholder="http://myProfilePicture.jpg" />
          <Field name="bio" component={ renderInput } label="Speaker Bio:" placeholder="John Doe is involved with...." multiline={true} />
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}}transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Add Speaker</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    )
  }
}

AddSpeakersForm = reduxForm({
  form: 'AddSpeaker'
})(AddSpeakersForm)

AddSpeakersForm = connect(
  state => ({
    admin: state.adminReducer
  }))(AddSpeakersForm)

export default AddSpeakersForm;