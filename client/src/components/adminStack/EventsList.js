import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EventsListEntry from './EventsListEntry.js';

import {connect} from 'react-redux';
import { adminReducer } from '../actions/actions';


class EventsList extends Component {
  // static navigationOptions = ({ navigation }) => {

  // };
  constructor(props) {
    super(props);

  }

  handleClick() {
    this.props.navigation.navigate('DateTabs');
  }

  convertDataTypes() {
    // convert the store object form into an array
  }

  render() {
    // console.log('this.props.data: ', this.props);
    return (
      <Content>
         <List> 
            {/* {console.log('proppps', this.props.data[0])}  */}

               {/* {this.props.data[0].map(event => {
                return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DateTabs')}>
                <EventsListEntry 
                  eventData={event}
                  />
              </TouchableOpacity>
              );
            })}  */}

          </List>
        </Content>
    );
  }
}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    data: state.adminReducer
  };
};

export default connect(mapStateToProps)(EventsList);