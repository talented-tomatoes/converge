import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedConference, decorateUserWithAvatar } from '../actions/actions'
import { TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Drawer } from 'native-base';
import ConferenceListEntry from '../registerStack/ConferenceListEntry.js';
import Config from '../../../../config/config.js';
import AttendeeStackHeader from './helpers/AttendeeStackHeader';
import SideBar from '../helpers/ProfileSidebar';


class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  }

  openDrawer() {
    console.log('drawer open');
    this.drawer._root.open()
  };

  componentDidMount() {
    const SERVER_URL = Config.server.url || 'http://localhost:3000';
    axios.get(SERVER_URL + `api/join/conferences_users/${this.props.user.id}`)
      .then(response => {
        this.setState({
          conferences: response.data
        });
      });
    axios.get(SERVER_URL + `api/users/${this.props.user.id}`)
      .then(user => {
        this.props.dispatch(decorateUserWithAvatar(user.data.avatar_url));
      });
  }

  handleImageOnPress(conference) {
    this.props.dispatch(setSelectedConference(conference));
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        <AttendeeStackHeader
          navigation={this.props.navigation}
          leftNavigation={this.openDrawer.bind(this)}
          leftIcon="menu"
          title="My Events"
          rightNavigation="ConferenceList"
          rightIcon= "search"
        />
        <Content>
          {
            this.state.conferences.map((conference, i) => {
              return (
                <TouchableOpacity key={i} onPress={this.handleImageOnPress.bind(this, conference)}>
                  <ConferenceListEntry conference={conference}/>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(MyEvents);