import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content, Card, Item, Input } from 'native-base';
import DatePicker from './DatePicker.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { addConference } from '../actions/actions';

class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
  constructor(props) {
    super(props)

    this.state = {
      startDate: '',
      endDate: '',
      locationAddress: '',
      nameOfEvent: ''
    }
  }


  onLocationAddressChange() {

  }

  onNameOfEventChange() {

  }

  onSubmitDetails(event) {
    console.log('startDate:', this.state.startDate);
    console.log('endDate:', this.state.endDate);

  }

  onStartDateChangedate() {
    console.log('changing the start date now');
    this.setState({
      
    })
  }

  render() {
    console.log('this.props in create event: ', this.props);
    return (
      <Container>
          <Text> Start Date: </Text>
          <DatePicker 
            />
          <Text> End Date: </Text>
          <DatePicker 
            onDateChange={(date) => {this.setState({endDate: date})}}
            mode="date"
            date={this.state.endDate}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            />

        <Card>
          <Item>
            <Input placeholder="Name of Event" />
            </Item>
          <Item>
            <Input placeholder="Location of Event" />
             {/* <GooglePlacesAutocomplete
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
            /> */}
            </Item>
            <Item>
              <Input placeholder="upload venue map">
              </Input>
              </Item>
              <Item>
                <Input placeholder="upload event banner"></Input>
              </Item>
          </Card>


        <Button
          full
          success
          onPress={this.onSubmitDetails.bind(this)}
          >
          <Text> Create this Event </Text>
          </Button>
        </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    conference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(NewEvent);