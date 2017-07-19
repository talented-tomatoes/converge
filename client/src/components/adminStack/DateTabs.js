import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ScheduleEditPage from './ScheduleEditPage';
import SpeakersEditPage from './SpeakersEditPage';
import MapEditPage from './MapEditPage';
import { TabNavigator } from 'react-navigation';



export default class DateTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: ['July 1, 2017', 'July 2, 2017', 'July 3, 2017']
    };
  }

  fetchData() {
    // will make calls to the database to get the data
  }

  render() {
    // console.log('in datetabs');
    return (
      <Container>
        <Header hasTabs/>
          <Tabs>
            {this.state.dates.map(date => {
              return (
                <Tab heading={ <TabHeading><Text>{date}</Text></TabHeading> }>
                  <EditStack />
                  </Tab>
              );
            })}
        </Tabs> 
      </Container>
    );
  }
}

const EditStack = TabNavigator({
  Schedule: { screen: ScheduleEditPage },
  Speakers: { screen: SpeakersEditPage },
  Map: { screen: MapEditPage },
}, {
  headerMode: 'none'
});