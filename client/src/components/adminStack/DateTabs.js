import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ScheduleEditPage from './ScheduleEditPage';
import SpeakersEditPage from './SpeakersEditPage';
import MapEditPage from './MapEditPage';
import DateTabEntry from './DateTabEntry';

export default class DateTabs extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      // eventually would get its data from  up above after eceive data from the API call to the database
      dates: [
        {
          date: 'July 17, 2017'
        },
        { 
          date: 'July 18, 2017'
        }, 
        {
          date: 'July 19, 2017'
        }]
    };
  }

  render() {
    return (
      <Container>
        <Header/>
        {/* <Tabs>
          {this.state.dates.map(date => {
            return (
              <Text>{date.date}</Text>
            );
          })}
        </Tabs> */}
        <Text>Hello</Text>
      </Container>
    );
  }
}