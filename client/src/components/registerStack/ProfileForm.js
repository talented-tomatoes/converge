import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Header, Left, Right, Body, Title, Card, CardItem, Thumbnail, Badge, Icon, Grid, Col, Spinner } from 'native-base';
import uploadImage from './helpers/uploadImage'
import normalizePhoneNumber from './helpers/normalizePhoneNumber';
import kairosEnrollReqObj from './helpers/kairosEnrollReqObj';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Config from '../../../../config/config.js';

import RegisterStackHeader from './helpers/RegisterStackHeader.js'
import randomColor from '../helpers/randomColor';


import { Field, reduxForm } from 'redux-form';

const required = value => {
  return value ? undefined  : <Text> Required </Text>
};

const linkedin = (value) => {
  return value && (value.toLowerCase().indexOf('linkedin.com') !== -1)
               ? <Text> Enter only the Handle</Text>
              : undefined
}

const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType, normalize, placeholder, meta: { touched, error, warning }}) => {
  return (
    <Item inlineLabel>
      <Label>{label}</Label>
      <Input keyboardType={keyboardType} onChangeText={onChange} {...restInput} normalize={normalize} placeholder={placeholder}/>
      {touched &&
        (error &&
          <Item error>
            {error}
          </Item>) }
    </Item>
  )
}

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAttendee: true,
      avatarSource: '',
      isLoading: false
    }
    this.randomColor = randomColor();
  }

saveToDB(user, userType) {
  user.user_type = userType;
  console.log('user: ', user);
  const SERVER_URL = Config.server.url || 'http://localhost:3000';
  let url = SERVER_URL + 'api/registerUser';
  let options = user;
  axios.post(url, user)
    .then(response => {
      console.log('response : ', response);
      if (userType === 'attendee') {
        this.props.navigation.navigate('ConferenceList');
      } else if (userType === 'host') {
        this.props.navigation.navigate('AdminStack');
      }
    })
    .catch(error => {
      console.log('error saving user to DB: ', error);
    })
  };

  submit(userType, user) {
    let userToSave = {
      login_id: this.props.user.id,
      first_name: this.props.user.givenName,
      last_name: this.props.user.familyName,
      avatar_url: this.state.avatarSource.uri,
      email: this.props.user.email,
      linkedin_id: user.linkedIn,
      phone_number: user.phoneNumber,
    };

    this.saveToDB(userToSave , userType);
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
        this.setState({ isLoading: true });
        let options = uploadImage(response.data)
        axios.post(options.url, options.body)
        .then( response => {
          this.setState({
            avatarSource: {uri: response.data.secure_url}
          });
          options = kairosEnrollReqObj(response.data.secure_url, this.props.user.id, this.props.user.id);
          return axios.post(options.url, options.body, options.config)
        })
        .then(response => {
          this.setState({ isLoading: false });
          // console.log('response.images[0]', response.images[0].transaction.status);
        })
        .catch(err => {
          this.setState({ isLoading: false });
          console.log('error uploading profile picture:', err);
        })
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Header style={{backgroundColor: '#428bca'}}>
          <Left />
          <Body>
          <Title style={{color: 'white'}}>Almost done...</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{padding: 10}}>
          <Card>
            <CardItem>
              <Field name="linkedIn" validate={[required, linkedin]} component={ renderInput } label="LinkedIn Handle:" />
            </CardItem>
            <CardItem>
              <Field name="phoneNumber" validate={[required]} component={ renderInput } label="Phone Number:" keyboardType="phone-pad" normalize={normalizePhoneNumber} />
            </CardItem>
            <CardItem style={{alignSelf: 'center'}}>
              <Text note>Tap below to attach a profile picture</Text>
            </CardItem>
            <CardItem style={{paddingTop: 15}}>
              <Body>
                <Left>
                  {
                    (this.state.isLoading) ? (
                      <Spinner color={this.randomColor} />
                    ): (
                      <TouchableOpacity light onPress={() => this.takePicture()}>
                        <Thumbnail large source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} />
                      </TouchableOpacity>
                    )
                  }

                </Left>
              </Body>

            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
          </Card>
        </Content>
        <Text style={{alignSelf: 'center'}} note>Swipe For Host</Text>
        <Footer>
          <Content style={{flex:1}}>
            <Swiper style={{backgroundColor: '#428bca'}} showsButtons={false}>
              <Button style={{alignSelf: 'center'}}transparent onPress={handleSubmit(this.submit.bind(this, 'attendee'))}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Register as Attendee</Text>
              </Button>
              <Button style={{alignSelf: 'center'}}transparent onPress={handleSubmit(this.submit.bind(this, 'host'))}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Register as Host</Text>
              </Button>
            </Swiper>
          </Content>
        </Footer>
      </Container>
    )
  }
}

const reduxFormConfig = {
  form: 'ProfileForm',
  fields: ['linkedIn', 'phoneNumber']
}
ProfileForm = reduxForm(reduxFormConfig)(ProfileForm)

export default ProfileForm


