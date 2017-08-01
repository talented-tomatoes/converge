import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Container, Button, Input, Spinner, Badge, Grid, Col, Card, Thumbnail, CardItem, Body, Label, Item, Content, Separator, Text, Footer, FooterTab, Icon, ListItem, Toast, Left } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import uploadImage from '../registerStack/helpers/uploadImage';
import convertDateToEnglish from './helpers/convertDateToEnglish'
import axios from 'axios';
import Config from '../../../../config/config.js';
import randomColor from '../helpers/randomColor';
import AdminStackHeader from './helpers/AdminStackHeader';
import DatePicker from './DatePicker.js';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { setAdminSelectedConference } from '../actions/actions.js';

const required = value => {
  return value ? undefined  : <Text> Required </Text>
};

const price = (value) => {
  return value && isNaN(Number(value))
         ? <Text> Must be a Number </Text>
         : undefined
};

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

class EditConferenceForm extends Component {
  constructor(props) {
    super(props);
    var defaultImage = 'https://res.cloudinary.com/awchang56/image/upload/v1501540513/default-placeholder-1024x1024-959x540_dgzvxo.png';
    this.state = {
      start_date: '' || this.props.admin.selectedConference.start_date,
      end_date: '' || this.props.admin.selectedConference.end_date,
      start_time: '' || this.props.admin.selectedConference.start_time,
      end_time: '' || this.props.admin.selectedConference.end_time,
      banner: this.props.admin.selectedConference.banner || defaultImage,
      logo: this.props.admin.selectedConference.logo || defaultImage,
      venue_map: this.props.admin.selectedConference.venue_map || defaultImage,
      isLoading: {}
    }
    this.handleConferenceDelete = this.handleConferenceDelete.bind(this);
    this.randomColor = randomColor();
  }
  static navigationOptions = {
    title: 'Update Conference Details',
    headerLeft: <Button transparent onPress={() => {navigation.navigate('EditConference')}}><Icon name="menu"/></Button>
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    // set Values for the pre-load of conference form
    const conferenceValues = {
      start_date: this.props.admin.selectedConference.start_date,
      end_date: this.props.admin.selectedConference.end_date,
      name: this.props.admin.selectedConference.name,
      address: this.props.admin.selectedConference.address,
      logo: this.props.admin.selectedConference.logo,
      // need to stringify the price so that it can be pre-loaded into the field
      ticket_price: JSON.stringify(this.props.admin.selectedConference.ticket_price),
      venue_map: this.props.admin.selectedConference.venue_map,
      banner: this.props.admin.selectedConference.banner,
      details: this.props.admin.selectedConference.details,
      // include the conference ID so that you can edit it in database
      // id: this.props.admin.selectedConference.id
    };
    this.props.initialize(conferenceValues);
  }

  uploadImage(imageType) {
    this.state.isLoading[imageType] = true;
    this.setState({
      isLoading: this.state.isLoading
    })
     let options = {
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let options = uploadImage(response.data);
        axios.post(options.url, options.body)
          .then(response => {
            console.log('Response URL: ', response.data.secure_url);
            if (imageType === 'logo') {
              this.state.isLoading[imageType] = false;
              this.setState({
                logo: response.data.secure_url,
                isLoading: this.state.isLoading
              });
            } else if (imageType === 'venue_map') {
              this.state.isLoading[imageType] = false;
              this.setState({
                venue_map: response.data.secure_url,
                isLoading: this.state.isLoading
              });
            } else if (imageType === 'banner') {
              this.state.isLoading[imageType] = false;
              this.setState({
                banner: response.data.secure_url,
                isLoading: this.state.isLoading
              });
            }
          })
          .catch(err => {
            console.log('Error: ', err);
          })
      }
    })
  }

  saveToDB(conference) {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';

    let url = SERVER_URL;
    if (this.props.admin.selectedConference.id === undefined) {
      url += 'api/addConference';
    } else {
      url += 'api/editConference';
    }
    axios.post(url, conference)
      .then(response => {
        Toast.show({
          text: conference.name + ' created',
          position: 'bottom',
          buttonText: 'X',
          type: 'success'
        });
        // console.log('response from the updated: ', response.data);
        axios.get(SERVER_URL + 'api/conference/' + this.props.admin.selectedConference.id)
          .then(conference => {
            console.log('new conference information: ', conference.data);
            this.props.dispatch(setAdminSelectedConference(conference.data));
          })
          .catch(err => {
            console.log('error: ', err);
          })
        this.props.navigation.navigate('AdminLanding');
      })
      .catch(error => {
        console.log('error:', error.response.data);
        Toast.show({
          text: this.props.admin.selectedConference.id === undefined ? 'Error adding conference' : 'Error updating conference',
          position: 'bottom',
          buttonText: 'X',
          type: 'danger'
        });
      })
    }

  submit(conference) {
    conference.user_id = this.props.user.userID;
    conference.start_date = this.state.start_date;
    conference.end_date = this.state.end_date;
    conference.start_time = this.state.start_time;
    conference.end_time = this.state.end_time;
    conference.id = this.props.admin.selectedConference.id;
    conference.logo = this.state.logo;
    conference.banner = this.state.banner;
    conference.venue_map = this.state.venue_map;
    console.log('SAVING conference ', conference);
    this.saveToDB(conference);
  }

  onStartDateChange(date) {
    this.setState({
      start_date: date
    })
  }

  onEndDateChange(date) {
    this.setState({
      end_date: date
    })
  }

  onStartTimeChange(time) {
    console.log('changing the start time now to ', time);
    this.setState({
      start_time: time
    })
  }

  onEndTimeChange(time) {
    console.log('changing the end time now to ', time);
    this.setState({
      end_time: time
    })
  }

  areYouSure() {
    Alert.alert(
      'Delete',
      'This will delete the conference, all presentations, and all associated speakers',
      [
        {text: 'Proceed', onPress: () => this.handleConferenceDelete()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  handleConferenceDelete() {
  let currentConf = this.props.admin.selectedConference;
  axios.delete(`${Config.server.url}api/deleteConference/${currentConf.id}`)
    .then(response => {
      console.log('RESPONSE FROM SERVER ON DELETE CONFERENCE ', response);
      // only navigate when the conference actual deletes
      Toast.show({
        text: `${currentConf.name} deleted`,
        position: 'bottom',
        buttonText: 'X',
        type: 'warning'
      });
      this.props.navigation.navigate('AdminLanding');
    })
    .catch(err => {
      Toast.show({
        text: `Could not delete ${currentConf.name}`,
        position: 'bottom',
        buttonText: 'X',
        type: 'danger'
      });
    console.log('error deleting the conference ', err);
  })

}

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation={this.props.admin.selectedConference.id ? 'AddPresentation' : 'AdminLanding'}
          leftIcon="arrow-back"
          title={this.props.admin.selectedConference.id ? 'Edit Event' : 'New Event'}
          rightIcon={this.props.admin.selectedConference.id ? 'trash' : ''}
          rightAction={this.areYouSure.bind(this)}
        />
        <Content style={{padding: 10}}>
          <Card>
            <CardItem>
              <Left>
                <TouchableOpacity onPress={() => this.uploadImage('logo')}>
                  {
                    this.state.isLoading['logo'] ? <Spinner color={this.randomColor}/> : <Thumbnail square source={{uri: this.state.logo }} />
                  }
                </TouchableOpacity>
                <Body>
                  <Field name="name" validate={[required]} component={ renderInput } placeholder="Conference Name"/>
                  <Text note>{this.state.start_date && this.state.end_date ? `${convertDateToEnglish(this.state.start_date)} to ${convertDateToEnglish(this.state.end_date)}` : 'Date'}</Text>
                </Body>
              </Left>
            </CardItem>
            <TouchableOpacity onPress={() => this.uploadImage('banner')}>
              <CardItem cardBody>
                {
                  this.state.isLoading['banner'] ?
                      <View style={{height: 200, flex: 1}}>
                        <Left>
                          <Spinner color={this.randomColor}/>
                        </Left>
                      </View>
                    : <Image source={{uri: this.state.banner}} style={{height: 200, flex: 1}}/>
                }
              </CardItem>
            </TouchableOpacity>
            </Card>
            <Card>
              <CardItem>
                <Text>Start Date:  </Text>
                <DatePicker onChange={this.onStartDateChange.bind(this)} date={this.props.admin.selectedConference.start_date} disabled={!!this.props.admin.selectedConference.id} value={this.props.admin.selectedConference.start_date}/>
              </CardItem>
              <CardItem>
                <Text>Start Time: </Text>
                <DatePicker onChange={this.onStartTimeChange.bind(this)} mode='time' disabled={!!this.props.admin.selectedConference.id} value={this.props.admin.selectedConference.end_time} />
              </CardItem>
              <CardItem>
                <Text>End Date:   </Text>
                <DatePicker onChange={this.onEndDateChange.bind(this)} date={this.props.admin.selectedConference.end_date} disabled={!!this.props.admin.selectedConference.id} value={this.props.admin.selectedConference.end_date}/>
              </CardItem>
              <CardItem>
                <Text>End Time:   </Text>
                <DatePicker onChange={this.onEndTimeChange.bind(this)} mode='time' disabled={!!this.props.admin.selectedConference.id} value={this.props.admin.selectedConference.end_time}/>
              </CardItem>
              <CardItem>
                <Field name="address" validate={[required]} component={ renderInput } label="Address:"/>
              </CardItem>
              <CardItem>
                <Field name="ticket_price" validate={[required, price]} component={ renderInput } label="Ticket Price:" keyboardType="numeric" />
              </CardItem>
            </Card>
            <Card>
            <CardItem>
              <Text>Details:</Text>
            </CardItem>
            <CardItem>
              <Content style={{height: 75}}>
               <Field name="details" validate={[required]} component={ renderInput } multiline={true} />
              </Content>
            </CardItem>
            <CardItem>
              <Text>Venue Map:</Text>
            </CardItem>
            <TouchableOpacity onPress={() => this.uploadImage('venue_map')}>
              <CardItem>
                {
                  this.state.isLoading['venue_map'] ?
                  <Body>
                    <Left>
                     <Spinner color={this.randomColor}/>
                    </Left>
                  </Body>
                  : <Image source={{uri: this.state.venue_map}} style={{height: 285, flex: 1}}/>
                }
              </CardItem>
            </TouchableOpacity>
          </Card>
        </Content>
        <Footer>
          <Content style={{backgroundColor: this.randomColor}}>
            <Button style={{flex: 1, alignSelf: 'center'}} transparent onPress={handleSubmit(this.submit.bind(this))}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>{this.props.admin.selectedConference.id ? 'Update Conference Details' : 'Add New Conference'}</Text>
            </Button>
          </Content>
        </Footer>
      </Container>
    );
  }
}

const reduxFormConfig = {
  form: 'EditConferenceForm',
  fields: ['name', 'address', 'logo', 'ticket_price', 'venue_map', 'banner', 'details']
}

EditConferenceForm = reduxForm(reduxFormConfig)(EditConferenceForm)

EditConferenceForm = connect(
  state => ({
    admin: state.adminReducer,
    user: state.userReducer
  }))(EditConferenceForm)

export default EditConferenceForm;