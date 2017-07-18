import React, { Component } from 'react';
import { Tab, TabHeading, Icon, Text } from 'native-base';
import MapEditPage from './MapEditPage';

export default class DateTabEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

        <Tab heading={ <TabHeading><Text>Camera</Text></TabHeading> }>

        </Tab>

    );
  }
  
}