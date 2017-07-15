import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content, Card, Item, Input } from 'native-base';
import DatePicker from './DatePicker.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
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
             <GooglePlacesAutocomplete
              placeholder="Input Location"
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              renderDescription={(row) => row.description}
              listViewDisplayed="auto"
              query={{
                key: "AIzaSyCJmGGm6zUUMgYxRKwXGH1KzlK6p910QEQ",
                language: "en",
              }}
              onPress={(data, details = null) => {
                console.log(data);
                console.log(details);
              }}
              getDefaultValue={ () => {
                return '';
              }} 
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                },
              }}
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'food',
              }}
              debounce={200}
              currentLocation={true}
              nearbyPlacesAPI="GooglePlacesSearch"
            />   
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
    )
  }

}