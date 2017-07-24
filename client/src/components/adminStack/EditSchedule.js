import React, { Component } from 'react';
import { Container, Content, Header, Text, Button, Tabs, Tab, Icon } from 'native-base';

import { connect } from 'react-redux';
import axios from 'axios';

import EditConferenceFooter from './helpers/EditConferenceFooter';
import EditScheduleForm from './EditScheduleForm';
import renderListOfDatesFromConference from './helpers/renderListOfDatesFromConference';
import convertDateToEnglish from './helpers/convertDateToEnglish';
import Config from '../../../../config/config.js';



class EditSchedule extends Component {
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
      headerRight: <Button transparent onPress={() => navigation.navigate('EditScheduleForm')}><Icon name="add"/></Button>,
      headerLeft: <Button transparent onPress={() => navigation.navigate('AdminLanding')}><Icon name="arrow-back"/></Button>
    }
  };

  componentDidMount() {
    console.log('EDIT SCHEDULE SCREEN MOUNTED, PROPS ARE: ', this.props.admin)
    // const getAllPresentationsWithConferenceIdUrl = 'http://localhost:3000/api/presentations/' + this.props.admin.selectedConference.id
    // axios.get(getAllPresentationsWithConferenceIdUrl)
    //   .then(presentations => {
    //     this.setState({
    //       presentations: presentations.data
    //     }, () => console.log(this.state.presentations));
    //   })
    //   .catch(err => {
    //     console.log('error fetching presentations: ', err);
    //   });
  }

  fetchData() {
    // will make calls to the database to get the data
  }

  render() {
    console.log('in EditSchedule');
    console.log('editschedule props', this.props);
    console.log('this.state.presentations: ', this.state.presentations);
    return (
      <Container>
        <Tabs initialPage={0}>
          {
            this.state.dates.map((date, i) => {
              return (
                <Tab key={i} heading={date}>
                  <Content>
                    {
                      this.state.presentations.filter(presentation => {
                        console.log(convertDateToEnglish(presentation.date), date)
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

export default connect(mapStateToProps)(EditSchedule);
