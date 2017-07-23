import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EventsListEntry from './EventsListEntry.js';

// redux things
import {connect} from 'react-redux';
import { decorateUserWithDBConferenceID, setAdminSelectedConference } from '../actions/actions';




class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: this.props.data || [],
      isDataFetched: false
    };

  }


  handleClick() {
    this.props.navigation.navigate('DateTabs');
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.data && !this.state.isDataFetched) {
      this.setState({
        events: nextprops.data,
        isDataFetched: true
      });
    }
  }

  render() {
    return (
      <Content>
         <List>
          {
            this.state.events.map((event, key) => {
              return (
              <TouchableOpacity 
                key={key} 
                onPress={() => {
                  { console.log('dispatching this conferenceID: ', event.id); } 
                  this.props.dispatch(decorateUserWithDBConferenceID(event.id)); 
                  this.props.navigation.navigate('EditSchedule');
                }}>
                <EventsListEntry
                  eventData={event}
                  />
              </TouchableOpacity>
              );
            })
          }
          </List>
        </Content>
    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    data: state.adminReducer.data,
    confID: state.adminReducer.confID,
    admin: state.adminReducer,
  };
};

export default connect(mapStateToProps)(EventsList);