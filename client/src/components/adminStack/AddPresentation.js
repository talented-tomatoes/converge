import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Tabs, Tab, Icon } from 'native-base';

import { connect } from 'react-redux';
import axios from 'axios';

import EditConferenceFooter from './helpers/EditConferenceFooter';
import AddPresentationForm from './AddPresentationForm';
import renderListOfDatesFromConference from './helpers/renderListOfDatesFromConference';
import convertDateToEnglish from './helpers/convertDateToEnglish';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';




class AddPresentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: renderListOfDatesFromConference(this.props.admin.selectedConference),
      confID: null,
      presentations: [],
    };
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    const getAllPresentationsWithConferenceIdUrl = SERVER_URL + 'api/presentations/' + this.props.admin.selectedConference.id
    axios.get(getAllPresentationsWithConferenceIdUrl)
      .then(presentations => {
        this.setState({
          presentations: presentations.data
        }, () => console.log(this.state.presentations));
      })
      .catch(err => {
        console.log('error fetching presentations: ', err);
      });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Schedule',
      headerRight: <Button transparent onPress={() => navigation.navigate('AddPresentationForm')}><Icon name="add"/></Button>,
      headerLeft: <Button transparent onPress={() => navigation.navigate('AdminLanding')}><Icon name="arrow-back"/></Button>
    }
  };

  render() {
    console.log('in AddPresentation');
    console.log('AddPresentation props', this.props);
    console.log('this.state.presentations: ', this.state.presentations);
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="arrow-back"
          title="Presentations"
          rightNavigation="AddPresentationForm"
          rightIcon= "add"
        />

        <Tabs initialPage={0}>
          {
            this.state.dates.map((date, i) => {
              return (
                <Tab key={i} heading={date}>
                  <Content>
                    {
                      this.state.presentations.filter(presentation => {
                        console.log('convertDateToEnglish(presentation.date): ', convertDateToEnglish(presentation.date))
                        console.log('date: ', date);
                        return convertDateToEnglish(presentation.date) === date;
                      }).map((presentation, i) => {
                        return (
                          <Content key={i}>
                          <Text>{presentation.name}</Text>
                          <Text>{presentation.location}</Text>
                          <Text>{presentation.description}</Text>
                          <Text>{presentation.time}</Text>
                          </Content>
                        )
                      })
                    }
                  </Content>
                </Tab>
              )
            })
          }
        </Tabs>
        <EditConferenceFooter navigation={this.props.navigation} />

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer,
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(AddPresentation);
