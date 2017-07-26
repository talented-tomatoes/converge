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
import { loadSpeakerValues as loadSpeakerValuesIntoForm } from '../reducers/reducers.js';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';


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
    this.handleInitialize();
  }

  handleInitialize() {
    const speakerValues = {
      first_name: this.props.admin.first_name,
      last_name: this.props.admin.last_name,
      job_title: this.props.admin.job_title,
      email: this.props.admin.email,
      linkedin_id: this.props.admin.linkedin_id,
      avatar_url: this.props.admin.avatar_url,
      bio: this.props.admin.bio
    };
    this.props.initialize(speakerValues);
  }


  saveToDB(speaker) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
      let url = SERVER_URL + 'api/addSpeaker';
      let options = speaker;
      speaker.conference_id = this.props.admin.currentConfID;
      console.log(' SPEAKER INFORMATION, ', speaker)
      axios.post(url, speaker)
        .then(response => {
          console.log('response : ', response);
          // go back to the the EditSpeaker's landing page on success
          this.props.navigation.navigate('AddSpeakers');
        })
        .catch(error => {
          console.log('error saving speaker: ', error);
        })
    }

  submit(speaker) {
    speaker.conference_id = null;
    this.saveToDB(speaker);
    console.log('values in AddSpeakersForm: ', speaker);
  }

  render() {
    // console.log('props', this.props.admin);
    // this.props.loadSpeakerValues(this.speakerValues);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddSpeakers"
          leftIcon="arrow-back"
          title="Speakers"
          rightIcon= "trash"
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
    admin: state.adminReducer.speakerValues
  }))(AddSpeakersForm)

export default AddSpeakersForm;