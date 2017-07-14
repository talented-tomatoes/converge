import React, { Component } from 'react';
import { View, Text } from 'react-native';
<<<<<<< HEAD
import { Container, Button, Content, Card, Item, Input } from 'native-base';
import DatePicker from './DatePicker.js';
// import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';
=======
import { Container, Button, Content } from 'native-base';
>>>>>>> (feature) Admin home screen / events button / create event button



export default class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
<<<<<<< HEAD
  constructor(props) {
    super(props)

    this.state = {
      date: ""
    }
  }

  
  onSubmitDetails(event) {
    console.log(event);
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
          <Item>
            <Input placeholder="Name of Event" />
            </Item>
          </Card>
        <Card>
          <Item>
            {/* <GooglePlacesAutocomplete
              placeholder="Input Location"
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              renderDescription={(row) => row.description}
              listViewDisplayed="auto"
              onPress={(data, details = null) => {
                console.log(data);
                console.log(details);
              }}
              getDefaultValue={ () => return '' }
              > */}
            </Item>
          </Card>
        <Button 
          full
          success
          onPress={this.onSubmitDetails}
          >
          <Text> Submit Details </Text>
          </Button>
        </Container>
=======

  render() {
    return (
      <View>
        <Text> Create New Events Page </Text>
        <Text> Will have a form here for inputting basic details</Text>
        </View>
>>>>>>> (feature) Admin home screen / events button / create event button
    )
  }

}