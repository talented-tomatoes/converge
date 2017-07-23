import React, { Component } from 'react';
import { Container, Content, List, ListItem, Header, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import EditConferenceFooter from './helpers/EditConferenceFooter';
import EditSpeakersForm from './EditSpeakersForm';
import axios from 'axios';
import EditSpeakersList from './EditSpeakerComponents/EditSpeakerList';

// redux things
import { connect } from 'react-redux';


class EditSpeakers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speakers: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Speakers',
      headerRight: <Button transparent onPress={() => navigation.navigate('EditSpeakersForm')}><Icon name="add"/></Button>
    }
  };

  componentDidMount() {
    console.log('EDIT SPEAKERS LANDING PAGE MOUNTED', this.props);
    // make server call to get speakers from DB based on currentConfID;

    let url = 'http://localhost:3000/api/getSpeakersByConfID/' + this.props.admin.selectedConference.id;

    axios.get(url)
      .then(response => {
        console.log('response in SPEAKER LANDING: ', response);
        // on speakers data coming in, store it in local state
        this.setState({
          speakers: response.data
        }, function() {console.log('state changed to :', this.state.speakers)});
      })
      .catch(err => {
        console.log('error getting conference speakers: ', err);
      })

  }

  render() {
    return (
      <Container>
        <Content>
          <EditSpeakersList speakers={this.state.speakers}/>
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

export default connect(mapStateToProps)(EditSpeakers);
