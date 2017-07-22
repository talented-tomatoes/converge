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

class EditScheduleForm extends Component {
  static navigationOptions = {
    title: 'Add A Presentation',
    header: null,
    headerTruncatedBackTitle: ''
  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  saveToDB(presentation) {
      let url = 'http://localhost:3000/api/???????';
      let options = presentation;
      console.log('presentation: ', presentation);
      // axios.post(url, user)
      //   .then(response => {
      //     console.log('response : ', response);
      //   })
      //   .catch(error => {
      //     console.log('error: ', error);
      //   })
      this.props.navigation.navigate('EditSchedule');
    }

  submit(presentation) {
    presentation.speaker_id = null;
    presentation.conference_id = null;
    this.saveToDB(presentation);
  }

  render() {
    console.log('props in EditScheduleForm: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Content>
          <Field name="name" component={ renderInput } label="Presentation Name:" placeholder="React Native Best Practices" />
          <Field name="speaker_name" component={ renderInput } label="Speaker Name:" placeholder="John Doe" />
          <Field name="date" component={ renderInput } label="Date:" placeholder="7/04/17" keyboardType="numeric" />
          <Field name="time" component={ renderInput } label="Time:" placeholder="3:30 PM" keyboardType="numeric" />
          <Field name="location" component={ renderInput } label="Location:" placeholder="Twin Peaks Room" />
          <Field name="description" component={ renderInput } label="Description:" placeholder="Developing with React Native...." multiline={true} />
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

EditScheduleForm = reduxForm({
  form: 'AddPresentation'
})(EditScheduleForm)

EditScheduleForm = connect(
  state => ({
    admin: state.adminReducer
  })
  )(EditScheduleForm)

export default EditScheduleForm


