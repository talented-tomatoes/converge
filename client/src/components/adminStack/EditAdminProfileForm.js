import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Drawer, Button, Header, Thumbnail, Badge, Container, Card, Grid, Col, CardItem, Left, Right, Body, Input, Label, Item, Title, Content, Separator, Text, Footer, FooterTab, Icon, ListItem, Toast } from 'native-base';
// import UserSwiperFooter from './helpers/UserSwiperFooter';
import ImagePicker from 'react-native-image-picker';
import kairosEnrollReqObj from '../registerStack/helpers/kairosEnrollReqObj';
import uploadImage from '../registerStack/helpers/uploadImage';
import randomColor from '../helpers/randomColor';

// import Swiper from 'react-native-swiper';

import axios from 'axios';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';
import DatePicker from './DatePicker.js';
import normalizePhoneNumber from '../registerStack/helpers/normalizePhoneNumber';


// need initialize to initialize the form with some data if it exists
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { setAdminSelectedConference } from '../actions/actions.js';
import SideBar from './helpers/HostSidebar';


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
               ? <Text> Enter only the Handle</Text>
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

class EditAdminProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbUser: {},
      avatarSource: ''
    }
    this.randomColor = randomColor();
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

    const profileValues = {
      first_name: this.state.dbUser.first_name,
      last_name: this.state.dbUser.last_name,
      email: this.state.dbUser.email,
      phone_number: this.state.dbUser.phone_number,
      linkedin_id: this.state.dbUser.linkedin_id
    };

    this.props.initialize(profileValues);
  }


  saveToDB(profile) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    let url = SERVER_URL + 'api/users/';

    axios.put(url, profile)
      .then(response => {
        Toast.show({
          text: 'Profile Updated',
          position: 'bottom',
          buttonText: 'Okay',
          type: 'success'
        })
        this.props.navigation.navigate('AdminLanding');
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
        let options = uploadImage(response.data);
        console.log('options: ', options);
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
    console.log('in editProfile: ', this.props);
    return (
      <Container>
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
          <Content style={{padding: 10}}>
            <Card>
              <CardItem style={{paddingTop: 15}}>
                <Body>
                  <Left>
                    <TouchableOpacity light onPress={() => this.takePicture()}>
                      <Thumbnail large source={this.state.avatarSource ? this.state.avatarSource : require('../../../../assets/AvatarPlaceHolder.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.takePicture()} style={{position: 'absolute', left: 50, top: 50}}>
                      <Badge style={{backgroundColor: this.randomColor}}><Text><Icon name="md-create" style={{fontSize: 16, color: '#fff'}}></Icon></Text></Badge>
                    </TouchableOpacity>
                  </Left>
                </Body>
              </CardItem>
              <CardItem>
                <Field name="first_name" validate={[required]} component={ renderInput } label="First Name:"/>
              </CardItem>
              <CardItem>
                <Field name="last_name" validate={[required]} component={ renderInput } label="Last Name:"/>     
              </CardItem>
              <CardItem>
                <Field name="email" validate={[required, email]} component={ renderInput } label="Email:"/>
              </CardItem>
              <CardItem>
                <Field name="linkedin_id" validate={[required, linkedin]} component={ renderInput } label="Linkedin Handle:"/>
              </CardItem>
              <CardItem>
                <Field name="phone_number" component={ renderInput } label="Phone Number:" keyboardType="phone-pad" normalize={normalizePhoneNumber} />
              </CardItem>
              <Grid style={{ alignSelf: "center", flex: 0}}>
                <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
              </Grid>
            </Card>
          </Content>
          <Footer>
            <Content style={{backgroundColor: '#428bca'}}>
              <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Update Profile</Text>
              </Button>
            </Content>
          </Footer>
        </Drawer>
      </Container>
    )
  }
}

const reduxFormConfig = {
  form: 'EditAdminProfileForm',
  fields: ['name', 'address', 'logo', 'ticket_price', 'venue_map', 'banner', 'details']
}

EditAdminProfileForm = reduxForm(reduxFormConfig)(EditAdminProfileForm)

EditAdminProfileForm = connect(
  state => ({
    user: state.userReducer
  }))(EditAdminProfileForm)

export default EditAdminProfileForm;


