import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Config from '../../../../config/config.js';
import { Container, Content, List, Text, Button, Card, CardItem, Thumbnail, Left, Right, Body} from 'native-base';
import AdminStackHeader from './helpers/AdminStackHeader.js';
import EditConferenceFooter from './helpers/EditConferenceFooter.js';
import SideBar from '../helpers/ProfileSidebar';
import axios from 'axios';
import randomColor from '../helpers/randomColor';



class CheckedInAttendees extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      user_id: null
    }
    this.randomColor = randomColor();
  }

  componentDidMount() {
    axios.get(`${Config.server.url}api/getUserID/${this.props.user.id}`)
      .then(user => {
        var user_id = user.data.id;
        console.log(this.props.admin.selectedConference.id);
        axios.get(`${Config.server.url}api/join/conferences_users/conference/${this.props.admin.selectedConference.id}`)
          .then(response => {
            this.setState({
              attendees: response.data,
              user_id: user_id
            });
          })
          .catch(err => {
            console.log(err);
          })
      })
  }

  handleButtonPress() {
    console.log('button pressed', this.props.admin.selectedConference.id);
    axios.put(`${Config.server.url}api/join/conferences_users/conference/${this.props.admin.selectedConference.id}`, {user_id: this.state.user_id})
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AddPresentation"
          leftIcon="arrow-back"
          title="Checked in"
          rightIcon= {null}
        />
        <Content style={{padding: 10}}>
            {
              this.state.attendees.map((attendee, key) => {
                return (
                  <Card key={key}>
                    <CardItem>
                      <Thumbnail small source={{uri: attendee.users.avatar_url}} />
                      <TouchableOpacity style={{marginLeft: 15}}>
                      <Text>{attendee.users.first_name + ' ' + attendee.users.last_name}</Text>
                      </TouchableOpacity>
                      <Right>
                      </Right>
                    </CardItem>
                  </Card> 
                );
              })
            }
        </Content>
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

export default connect(mapStateToProps)(CheckedInAttendees);
