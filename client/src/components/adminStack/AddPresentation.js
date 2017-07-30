import React, { Component } from 'react';
import { Container, Content, Header, Left, Toast, List, Grid, Col, ListItem, Right, Body, Title, Text, Button, Tabs, Tab, Icon } from 'native-base';

import { connect } from 'react-redux';
import axios from 'axios';

import EditConferenceFooter from './helpers/EditConferenceFooter';
import AddPresentationForm from './AddPresentationForm';
import renderListOfDatesFromConference from './helpers/renderListOfDatesFromConference';
import convertDateToEnglish from './helpers/convertDateToEnglish';
import Config from '../../../../config/config.js';
import AdminStackHeader from './helpers/AdminStackHeader';
import { setAdminSelectedPresentation, setSpeakersOfConference, setPresentations } from '../actions/actions.js';




class AddPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: renderListOfDatesFromConference(this.props.admin.selectedConference),
      confID: null,
      presentations: [],
    };
  }

  componentDidMount() {
   this.getPresentations();
   this.getSpeakersOfConf();
   this.props.dispatch(setAdminSelectedPresentation({}));

  }

  getSpeakersOfConf() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + `api/speakers/${this.props.admin.selectedConference.id}`)
    .then(response => {
      console.log('SPEAKERS', response);
      this.props.dispatch(setSpeakersOfConference(response.data));
    })
    .catch(error => {
      console.log(error);
    });
  }

  getPresentations() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    const getAllPresentationsWithConferenceIdUrl = SERVER_URL + 'api/presentations/' + this.props.admin.selectedConference.id
    axios.get(getAllPresentationsWithConferenceIdUrl)
      .then(presentations => {
        this.props.dispatch(setPresentations(presentations.data));
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

  handleItemPress(presentation) {
    // used for editing the presentation details
    console.log('PRESENTATION DETAILS', presentation)
    this.props.dispatch(setAdminSelectedPresentation(presentation));
    this.props.navigation.navigate('AddPresentationForm');
  }

  handleDeletePress(presentation) {
    axios.delete(`${Config.server.url}api/presentations/${presentation.id}`)
      .then(response => {
        this.getPresentations();
        Toast.show({
            text: `${presentation.name} removed from your schedule`,
            position: 'bottom',
            buttonText: 'X',
            type: 'warning',
            duration: 2000
         });
      });
  }

  render() {
    console.log('in AddPresentation');
    console.log('AddPresentation props', this.props);
    console.log('this.state.presentations: ', this.state.presentations);
    var colors = ['#ff2d55', '#5856d6', '#007aff', '#5ac8fa', '#ffcc22', '#ff954f', '#ff3b30'];
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
                        {/* console.log('convertDateToEnglish(presentation.date): ', convertDateToEnglish(presentation.date)) */}
                        {/* console.log('date: ', date); */}
                        return convertDateToEnglish(presentation.date) === date;
                      }).map((presentation, i) => {
                        return (
                          <List key={i}>
                              <ListItem avatar onPress={this.handleItemPress.bind(this, presentation)}>
                                <Left>
                                  <Grid style={{ alignSelf: "center", width: 0, flex: 0, paddingLeft: 5}}>
                                    <Col style={{ backgroundColor:  colors[Math.floor(Math.random() * (colors.length - 1 + 1))], height: 50, width: 5}}></Col>
                                  </Grid>
                                  <Text>{presentation.time}</Text>
                                </Left>
                                <Body>
                                  <Text>{presentation.name}</Text>
                                  <Text note>{presentation.location}</Text>
                                </Body>
                                  <Right>
                                    <Button small transparent onPress={this.handleDeletePress.bind(this, presentation)}>
                                      <Icon name="trash" style={{color: '#428bca'}}/>
                                    </Button>
                                  </Right>
                              </ListItem>
                            </List>
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
