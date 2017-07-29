import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Drawer, Button, Header, Left, Right, Body, Input, Label, Item, Title, Content, Separator, Text, Footer, FooterTab, Icon, ListItem, Toast } from 'native-base';
// import UserSwiperFooter from './helpers/UserSwiperFooter';
import ImagePicker from 'react-native-image-picker';
import kairosEnrollReqObj from '../registerStack/helpers/kairosEnrollReqObj';
import uploadImage from '../registerStack/helpers/uploadImage';
import { NavigationActions } from 'react-navigation';

// import Swiper from 'react-native-swiper';

import axios from 'axios';
import Config from '../../../../config/config.js';
import DatePicker from '../adminStack/DatePicker.js';
import normalizePhoneNumber from '../registerStack/helpers/normalizePhoneNumber';


// need initialize to initialize the form with some data if it exists
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { setAdminSelectedConference } from '../actions/actions.js';
import SideBar from '../helpers/ProfileSidebar';


const required = value => {
  return value ? undefined  : <Text> Required </Text>
};

const email = (value) => {
 return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
              ? <Text> Invalid Email </Text>
              : undefined
}

const linkedin = (value) => {
  return value && (value.toLowerCase().indexOf('linkedin.com') !== -1)
               ? <Text> Enter just the handle </Text>
              : undefined
}

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

class EditAttendeeProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbUser: {},
      avatarSource: ''
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    this.drawer._root.open()
  };

  componentDidMount() {
    const SERVER_URL = Config.server.url;

    let url = SERVER_URL + 'api/users/' + this.props.user.id;
    axios.get(url)
      .then(user => {
        this.setState({
          dbUser: user.data,
          avatarSource: {uri: user.data.avatar_url}
        }, this.handleInitialize)
      })
      .catch(err => {
        console.log('error getting user: ', err);
      })
  }

  handleInitialize() {
    const linkedinid = this.state.dbUser.linkedin_id;
    let linkedinHandle = '';
    if (linkedinid) {
      const str = 'https://www.linkedin.com/in';
      const startIndex = linkedinid.indexOf('https://www.linkedin.com/in') + 1 + str.length;
      linkedinHandle = linkedinid.substring(startIndex);
    }
    const profileValues = {
      first_name: this.state.dbUser.first_name,
      last_name: this.state.dbUser.last_name,
      email: this.state.dbUser.email,
      //linkedin_id: this.state.dbUser.linkedin_id,
      phone_number: this.state.dbUser.phone_number,
    };
    if (linkedinid) {
      profileValues.linkedin_id = linkedinHandle;
    } else {
      profileValues.linkedin_id = this.state.dbUser.linkedin_id;
    }
    console.log('profileValues=======>', profileValues);
    this.props.initialize(profileValues);
  }


  saveToDB(profile) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    let url = SERVER_URL + 'api/editUserProfile/';

    axios.post(url, profile)
      .then(response => {
        Toast.show({
          text: 'Profile Updated',
          position: 'bottom',
          buttonText: 'Okay',
          type: 'success'
        })
        this.props.navigation.navigate('MyEvents');
      })
      .catch(err => {
        Toast.show({
          text: 'Profile Could Not Be Updated',
          position: 'bottom',
          buttonText: 'X',
          type: 'danger'
        })
        console.log('error updating user: ', err);
      })

    }

  submit(profile) {
    profile.login_id = this.props.user.id;
    profile.avatar_url = this.state.avatarSource.uri;
    profile.user_type = this.state.dbUser.user_type;
    if (!profile.linkedin_id.startsWith('https://www.linkedin.com/in/')) {
      profile.linkedin_id = `https://www.linkedin.com/in/${profile.linkedin_id}`;
    }
    this.saveToDB(profile);
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
          console.log('response url = ', response.data.secure_url);
          this.setState({
            avatarSource: {uri: response.data.secure_url}
          });
          options = kairosEnrollReqObj(response.data.secure_url, this.props.user.id, this.props.user.id);
          return axios.post(options.url, options.body, options.config)
        })
        .then(response => {
          console.log('response.images[0]', response.images[0].transaction.status);
        })
        .catch(err => {
          console.log('err=', err);
          // handle error scenario
        })
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
         <Header style={{backgroundColor: '#428bca'}}>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon style={{color: 'white'}} name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}} >Edit Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Field name="first_name" validate={[required]} component={ renderInput } label="First Name:" placeholder="John" />
          <Field name="last_name" validate={[required]} component={ renderInput } label="Last Name:" placeholder="Doe" />
          <Field name="email" validate={[required, email]} component={ renderInput } label="Email:" placeholder="johndoe123@gmail.com" />
          <Field name="linkedin_id" validate={[required, linkedin]} component={ renderInput } label="Linked Handle:" placeholder="linkedin.com/in/johndoe123" />
          <Field name="phone_number" component={ renderInput } label="Phone Number:" keyboardType="phone-pad" normalize={normalizePhoneNumber} placeholder="555-555-5555" />

          <Separator bordered>

            <Text style={{alignSelf: 'center'}} note>Tap below to take a new profile picture</Text>
          </Separator>
          <Item style={{margin: 5, alignSelf: 'center'}}>
            <TouchableOpacity light onPress={() => this.takePicture()}>
              <Image source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} style={{width: 100, height: 100}}></Image>
            </TouchableOpacity>
          </Item>

        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Update Profile</Text>
            </Button>
          </Content>
        </Footer>
      </Drawer>
    )
  }
}

const reduxFormConfig = {
  form: 'EditAttendeeProfileForm',
  fields: ['name', 'address', 'logo', 'ticket_price', 'venue_map', 'banner', 'details']
}

EditAttendeeProfileForm = reduxForm(reduxFormConfig)(EditAttendeeProfileForm)

EditAttendeeProfileForm = connect(
  state => ({
    user: state.userReducer
  }))(EditAttendeeProfileForm)

export default EditAttendeeProfileForm;


