import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, Text} from 'native-base';
import EventsListEntry from './EventsListEntry.js';
import EventDetails from './EventDetails.js';

export default class EventsList extends Component {
  constructor(props) {
    super(props);

    state = {
      data: [
        {
          title: 'Amazon',
          thumbnail: 'https://s3.amazonaws.com/BURC_Pages/downloads/a-smile_color.jpg',
          description: 'Description goes here.',
          image: 'https://d3i6fh83elv35t.cloudfront.net/newshour/wp-content/uploads/2015/08/RTR3UIDN-1024x683.jpg',
          date: 'Conference dates go here'
        },
        {
          title: 'Google',
          thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png',
          description: 'Description goes here.',
          image: 'https://kingdavidconsulting.com/wp-content/uploads/2016/04/Google-IO-2016-Event-Android-N-Nexus-7-Chrome-OS.jpg',
          date: 'Conference dates go here'
        },
        {
          title: 'SpaceX',
          thumbnail: 'https://kaggle2.blob.core.windows.net/organizations/486/thumbnail.png%3Fr=184',
          description: 'Description goes here.',
          image: 'https://www.trbimg.com/img-57506510/turbine/la-fi-spacex-mars-20160602-snap',
          date: 'Conference dates go here'
        }
      ]
    };
  }

  handleClick(title) {
    console.log('clicked on', title);
    this.props.navigate('EventDetails', { eventName: title });
  }

  render() {

    return (
      <Content>
        <List>
          {state.data.map(event => {

            return (
              <TouchableOpacity onPress={this.handleClick.bind(this, event.title)}>
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