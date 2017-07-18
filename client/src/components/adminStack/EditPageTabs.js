import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ScheduleEditPage from './ScheduleEditPage';
import SpeakersEditPage from './SpeakersEditPage';
import MapEditPage from './MapEditPage';

export default class EditTabs extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="list" /><Text>Schedule</Text></TabHeading>}>
            <ScheduleEditPage />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="person" /><Text>Speakers</Text></TabHeading>}>
            <SpeakersEditPage />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="map"/><Text>Map</Text></TabHeading>}>
            <MapEditPage />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}