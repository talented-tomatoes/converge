import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ScheduleEditPage from './ScheduleEditPage';
import SpeakersEditPage from './SpeakersEditPage';
import MapEditPage from './MapEditPage';
import DateTabEntry from './DateTabEntry';

export default class EditTabs extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      dates: ['July 17, 2017', 'July 18, 2017', 'July 19, 2017']
    };
  }

  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          {this.state.dates.map(date => {
            return (
              <DateTabEntry date={date} />
            );
          })}
        </Tabs>
      </Container>
    );
  }
}