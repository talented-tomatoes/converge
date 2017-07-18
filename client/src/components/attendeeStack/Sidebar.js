import React, { Component } from 'react';
import { Container, Button, Title, Text } from 'native-base';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
          <Text style={{padding: 10}}>Your Name Here</Text>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Speakers')}}>
            <Title>Speakers</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Presentations')}}>
            <Title>Presentations</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('MasterSchedule')}}>
            <Title>Event Schedule</Title>
          </Button>
          <Button rounded transparent onPress={() => {this.props.navigation.navigate('Checkin')}}>
            <Title>Check-in</Title>
          </Button>
      </Container>
    );
  }
}
