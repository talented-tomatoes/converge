import React, { Component } from 'react';
import { Container, Tab, TabHeading, Icon, Text } from 'native-base';


export default class DataTabEntry extends Component {

  render() {
    return (
      <Container>
        <Tab heading={ <TabHeading><Text>hello</Text></TabHeading> }>
        </Tab>
      </Container>
    );
  }
  
}