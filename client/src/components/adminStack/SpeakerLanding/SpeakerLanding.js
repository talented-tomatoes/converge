import React, { Component } from 'react';
import { Container, Content, List, ListItem, Header, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import EditConferenceFooter from './helpers/EditConferenceFooter';
import AddSpeakersForm from '../AddSpeakersForm';
import axios from 'axios';
import SpeakersList from './SpeakerList.js';
import Config from '../../../../../config/config.js';
import AdminStackHeader from '../helpers/AdminStackHeader.js';


// redux things
import { connect } from 'react-redux';
// import actions
import { setSpeakerInitialValues } from '../actions/actions.js';

class SpeakersLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speakers: []

    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Speakers',
      headerRight: <Button transparent onPress={() => navigation.navigate('AddSpeakersForm')}><Icon name="add"/></Button>,
      headerLeft: <Button transparent onPress={() => navigation.navigate('AdminLanding')}><Icon name="arrow-back"/></Button>
    }
  };

  componentDidMount() {
    // reset the Redux Store current speaker upon landing on this page
    // should be able to read this as being empty so that we can utilize this to tell the Form to make a post to the correct place
    this.props.dispatch(setSpeakerInitialValues({}));


    console.log('EDIT SPEAKERS LANDING PAGE MOUNTED', this.props);
    // make server call to get speakers from DB based on currentConfID;
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    let url = SERVER_URL + `api/speakers/${this.props.admin.selectedConference.id}`;

    axios.get(url)
      .then(response => {
        console.log('response in SPEAKER LANDING: ', response);
        // on speakers data coming in, store it in local state
        this.setState({
          speakers: response.data
        });
      })
      .catch(err => {
        console.log('error getting conference speakers: ', err);
      })

  }

  render() {
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="arrow-back"
          title="Speakers"
          rightNavigation="AddSpeakersForm"
          rightIcon= "add"
        />
        <Content>
          <SpeakersList
            speakers={this.state.speakers}
            navigation={this.props.navigation}/>
        </Content>
        <EditConferenceFooter navigation={this.props.navigation}/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer
  }
}

export default connect(mapStateToProps)(SpeakersLanding);
