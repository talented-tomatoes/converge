import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EventsListEntry from './EventsListEntry.js';

export default class EventsList extends Component {
  // static navigationOptions = ({ navigation }) => {

  // };
  constructor(props) {
    super(props);

  }

  handleClick() {
    this.props.navigation.navigate('DateTabs');
  }


  render() {
    console.log('this.props: ', this.props);
    return (
      <Content>
        <List>
          
          {this.state.data.map(event => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DateTabs')}>
                <EventsListEntry 
                  eventData={event}
                  />
              </TouchableOpacity>
            );
          })}
          </List>
        </Content>
    );
  }
}