import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab } from 'native-base';

import axios from 'axios';


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

class EditSpeakersForm extends Component {
  static navigationOptions = {
    title: 'Add A Speaker',
    header: null,
    headerTruncatedBackTitle: ''
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  saveToDB(speaker) {
      let url = 'http://localhost:3000/api/addSpeaker';
      let options = speaker;
      speaker.conf_id = this.props.navigation.state.params.conferenceID;
      axios.post(url, speaker)
        .then(response => {
          console.log('response : ', response);
        })
        .catch(error => {
          console.log('error: ', error);
        })
      this.props.navigation.navigate('EditSpeakers');
    }

  submit(speaker) {
    speaker.conference_id = null;
    this.saveToDB(speaker);
    console.log('values in EditSpeakersForm: ', speaker);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        {console.log('CONFERENCEID: ', this.props.navigation.state.params)}
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

export default reduxForm({
  form: 'AddSpeaker'
})(EditSpeakersForm)


