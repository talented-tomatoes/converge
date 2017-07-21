import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab } from 'native-base';
import uploadImage from './helpers/uploadImage'
import normalizePhoneNumber from './helpers/normalizePhoneNumber';
import UserSwiperFooter from './helpers/UserSwiperFooter';

import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Swiper from 'react-native-swiper';


import { Field, reduxForm } from 'redux-form';


const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, normalize, placeholder}) => {
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} placeholder={placeholder}/>
    </Item>
  )
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAttendee: true,
      avatarSource: '',
    }
  }

  takePicture() {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          avatarSource: { uri: 'https://media.giphy.com/media/210NUQw5BT8c0/giphy.gif' }
        });

        let options = uploadImage(response.data)

        axios.post(options.url, options.body)
          .then( response => {
            console.log('response: ', response.data.secure_url);
            this.setState({
              avatarSource: {uri: response.data.secure_url}
            });
          })
      }
    });
  }

  submit(values) {
    let user = {
      loginid: this.props.user.id,
      first_name: this.props.user.givenName,
      last_name: this.props.user.familyName,
      avatar_url: this.state.avatarSource.uri,
      email: this.props.user.email,
      linkedinid: values.linkedIn,
      phonenumber: values.phoneNumber,
    };
    return user;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Content>
          <Field name="linkedIn" component={ renderInput } label="LinkedIn URL:" placeholder="linkedin.com/in/johndoe123" />
          <Field name="phoneNumber" component={ renderInput } label="Phone Number:" keyboardType="phone-pad" normalize={normalizePhoneNumber} />
          <Separator bordered>
            <Text style={{alignSelf: 'center'}} note>Attach a profile picture</Text>
          </Separator>
          <Item style={{margin: 5, alignSelf: 'center'}}>
            <TouchableOpacity light onPress={() => this.takePicture()}>
              <Image source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}}></Image>
            </TouchableOpacity>
          </Item>
        </Content>
        <Text style={{alignSelf: 'center'}} note>Swipe For Host</Text>
        <Footer>
          <UserSwiperFooter navigation={this.props.navigation} handleSubmit={handleSubmit(this.submit.bind(this)).bind(this)} imageUrl={this.state.avatarSource.url}/>
        </Footer>
      </Container>
    )
  }
}

export default reduxForm({
  form: 'finishProfile'
})(ProfileForm)


