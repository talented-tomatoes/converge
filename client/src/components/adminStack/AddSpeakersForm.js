import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Container, Button, Input, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon, Spinner, Thumbnail, Badge, Body, Left, Right, Card, CardItem, Grid, Col, Toast } from 'native-base';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { loadSpeakerValues as loadSpeakerValuesIntoForm } from '../reducers/reducers.js';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';
import uploadImage from '../registerStack/helpers/uploadImage';
import randomColor from '../helpers/randomColor';

const required = (value) => {
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

class AddSpeakersForm extends Component {

  static navigationOptions = {
    title: 'Add A Speaker',
    headerLeft: <Button transparent onPress={() => navigation.navigate('AddSpeakers')}><Icon name="menu"/></Button>
  }
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.navigation.state.params !== undefined ? true : false,
      avatar: this.props.admin.speakerValues.avatar_url || '',
      isLoading: false
    }
    this.randomColor = randomColor();
    this.handleSpeakerDelete = this.handleSpeakerDelete.bind(this);
  }

  componentDidMount() {
    // do the pre-load of values
    this.props.initialize(this.props.initialValues);
  }

// <<<<<<< HEAD
//   // handleInitialize() {
//   //   const linkedinid = this.props.admin.speakerValues.linkedin_id;
//   //   let linkedinHandle = '';
//   //   if (linkedinid) {
//   //     const str = 'https://www.linkedin.com/in';
//   //     const startIndex = linkedinid.indexOf('https://www.linkedin.com/in') + 1 + str.length;
//   //     linkedinHandle = linkedinid.substring(startIndex);
//   //   }
//   //   const speakerValues = {
//   //     first_name: this.props.admin.speakerValues.first_name,
//   //     last_name: this.props.admin.speakerValues.last_name,
//   //     job_title: this.props.admin.speakerValues.job_title,
//   //     email: this.props.admin.speakerValues.email,
//   //     avatar_url: this.props.admin.speakerValues.avatar_url,
//   //     bio: this.props.admin.speakerValues.bio,
//   //     id: this.props.admin.speakerValues.id
//   //   };
//   //   if (linkedinid) {
//   //     speakerValues.linkedin_id = linkedinHandle;
//   //   } else {
//   //     speakerValues.linkedin_id = this.props.admin.speakerValues.linkedin_id;
//   //   }
//   //   this.props.initialize(speakerValues);
//   // }
// =======
//   handleInitialize() {
//     const linkedinid = this.props.admin.speakerValues.linkedin_id;
//     const speakerValues = {
//       first_name: this.props.admin.speakerValues.first_name,
//       last_name: this.props.admin.speakerValues.last_name,
//       job_title: this.props.admin.speakerValues.job_title,
//       email: this.props.admin.speakerValues.email,
//       avatar_url: this.props.admin.speakerValues.avatar_url,
//       linkedin_id: this.props.admin.speakerValues.linkedin_id,
//       bio: this.props.admin.speakerValues.bio,
//       id: this.props.admin.speakerValues.id
//     };
//     this.props.initialize(speakerValues);
//   }
// >>>>>>> e76c439bb4c04f83059144ba91af8133f0013ac3

  upload(imageType) {
     let options = {
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({isLoading: true});
        let options = uploadImage(response.data);
        axios.post(options.url, options.body)
          .then(response => {
            console.log('Response URL:', response.data.secure_url);
            this.setState({avatar: response.data.secure_url });
            this.setState({isLoading: false});
          })
          .catch(err => {
            console.log('Error: ', err);
          })
      }
    })
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
    //console.log('speaker: ', speaker)
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
    console.log('speaker: ', speaker);
    speaker.conference_id = this.props.admin.selectedConference.id;
    speaker.avatar_url = this.state.avatar;
    this.saveToDB(speaker);
  }

  handleSpeakerDelete() {
    let currentSpeaker = this.props.admin.speakerValues;
    axios.delete(`${Config.server.url}api/deleteSpeaker/${currentSpeaker.id}`)
      .then(response => {
        console.log('RESPONSE FROM SERVER ON DELETE SPEAKER ', response);
        this.props.navigation.navigate('AddSpeakers', {speakerDeleted: true});
      })
      .catch(err => {
        console.log('error deleting the conference ', err);
        Toast.show({
          text: `Error deleting ${currentSpeaker.first_name} ${currentSpeaker.last_name} right now...`,
          position: 'bottom',
          buttonText: 'X',
          type: 'warning',
          duration: 2000
        });
    })
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('addSpeakersForm props: ', this.props);
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddSpeakers"
          leftIcon="arrow-back"
          title="Speakers"
          rightIcon={!!this.props.admin.speakerValues.id ? "trash": ""}
          rightAction={this.handleSpeakerDelete}
        />
        <Content style={{padding: 10}}>
          <Card>
            <CardItem style={{paddingTop: 15}}>
              <Body>
                {
                  !this.state.isLoading ? (
                    <Left>
                      <TouchableOpacity light onPress={() => this.upload('avatar_url')}>
                        <Thumbnail large source={this.state.avatar ? {uri: this.state.avatar} : require('../../../../assets/AvatarPlaceHolder.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.upload('avatar_url')} style={{position: 'absolute', left: 50, top: 50}}>
                        <Badge style={{backgroundColor: this.randomColor}}><Text><Icon name="md-create" style={{fontSize: 16, color: '#fff'}}></Icon></Text></Badge>
                      </TouchableOpacity>
                    </Left>
                  ) : (
                    <Left>
                      <Spinner />
                    </Left>
                  )
                }
              </Body>
            </CardItem>
            <CardItem>
              <Field name="first_name" validate={[required]} component={ renderInput } label="First Name:" />
            </CardItem>
            <CardItem>
              <Field name="last_name" validate={[required]} component={ renderInput } label="Last Name:" />
            </CardItem>
            <CardItem>
              <Field name="job_title" validate={[required]} component={ renderInput } label="Job Title:" />
            </CardItem>
            <CardItem>
              <Field name="email" validate={[required, email]} component={ renderInput } label="Email:" />
            </CardItem>
            <CardItem>
              <Field name="linkedin_id" validate={[required, linkedin]} component={ renderInput } label="Linked Handle:" />
            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
          </Card>
          <Card>
            <Text style={{paddingLeft: 17, paddingTop: 10, paddingBottom: 10, fontWeight: 'bold'}}>Speaker Bio</Text>
            <CardItem>
              <Field name="bio" validate={[required]} component={ renderInput } multiline={true} />
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Content style={{backgroundColor: '#428bca'}}>
            <Button style={{flex: 1, alignSelf: 'center'}}transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>{this.props.admin.speakerValues.id ? 'Save Changes' : 'Add Speaker'}</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    )
  }
}

const reduxFormConfig = {
  form: 'AddSpeakersForm',
  fields: ['first_name', 'last_name', 'job_title', 'email', 'linkedin_id', 'avatar_url', 'bio']
}

AddSpeakersForm = reduxForm(reduxFormConfig)(AddSpeakersForm)

AddSpeakersForm = connect(
  state => ({
    admin: state.adminReducer,
    initialValues: state.adminReducer.speakerValues,
  })
  )(AddSpeakersForm)

export default AddSpeakersForm