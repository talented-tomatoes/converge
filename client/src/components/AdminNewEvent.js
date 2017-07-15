import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content, Card } from 'native-base';
import DatePicker from './DatePicker.js';



export default class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
  
  onSubmitDetails() {
    console.log('submitted the new event details!');
  }

  render() {
    return (
      <Container>
        <Card>
          <Text> Start Date: </Text>
          <DatePicker />
          </Card>
        <Card>
          <Text> End Date: </Text>
          <DatePicker />
          </Card>
        <Card> 
          </Card>
        <Card>
          </Card>
        <Button 
          full
          success
          onPress={this.onSubmitDetails}
          >
          <Text> Submit Details </Text>
          </Button>
        </Container>
    )
  }

}