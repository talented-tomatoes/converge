import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Content, Card, Item, Input } from 'native-base';
import DatePicker from './DatePicker.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { addConference } from '../actions/actions';
import axios from 'axios';

class NewEvent extends Component {
  static navigationOptions = {
    title: "Create New Event",
  };
  constructor(props) {
    super(props)

    this.state = {
      start_date: '',
      end_date: '',
      address: '',
      name: '',
      logo: '',
      banner: '',
      venue_map: '',
      details: '',
      price: 0
    }

  }


  onNameOfEventChange(name) {
    console.log('event name', name);
    this.setState({
      nameOfEvent: name
    })
  }

  onLocationAddressChange(address) {
    console.log('address', address);
    this.setState({
      locationAddress: address
    })
  }

  onStartDateChangeDate(date) {
    console.log('changing the start date now to ', date);
    this.setState({
      startDate: date
    })
  }  
  
  onEndDateChangeDate(date) {
    console.log('changing the end date now to ', date);
    this.setState({
      endDate: date
    })
  }
    
  onTicketPriceChange(price) {
    console.log('price', price);
    this.setState({
      ticket_price: price
    })
  }  
  
  onEventDetailsChange(details) {
    console.log('details', details);
    this.setState({
      details: details
    })
  }

  onSubmitDetails() {
    let details = {
      start_date: this.state.startDate,
      end_end: this.state.endDate,
      address: this.state.locationAddress,
      name: this.state.nameOfEvent,
      banner: 'https://d3i6fh83elv35t.cloudfront.net/newshour/wp-content/uploads/2015/08/RTR3UIDN-1024x683.jpg',
      venue_map: 'https://s-media-cache-ak0.pinimg.com/736x/b1/a0/51/b1a051ec5a60c4572771f6e288d33b5c.jpg',
      details: this.state.details,
      ticket_price: this.state.price,
      logo: 'https://s3.amazonaws.com/BURC_Pages/downloads/a-smile_color.jpg'
    }
    console.log(details);


    // AXIOS
    // ==================================
    axios.post('apiURL', details)
      .then(function(response) {
        console.log(response);
        // navigate to the the admin landing
        this.props.navigation.navigate('AdminStack')
      })
      .catch(function(err) {
        console.log(err);
      });


    
    this.props.navigation.navigate('AdminLanding')
  }

  // handle 


  render() {
    console.log('this.props in create event: ', this.props);
    return (
      <Container>
          <Text> Start Date: </Text>
          <DatePicker onChange={this.onStartDateChangeDate.bind(this)} />
          <Text> End Date: </Text>
          <DatePicker onChange={this.onEndDateChangeDate.bind(this)} />

        <Card>
          <Item>
            <Input 
              placeholder="Name of Event" 
              onChangeText={this.onNameOfEventChange.bind(this)}
              />
            </Item>
          <Item>
            <Input 
              placeholder="Location of Event" 
              onChangeText={this.onLocationAddressChange.bind(this)}/>
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
              <Input 
                placeholder="upload venue map"

                ></Input>
              </Item>
            <Item>
              <Input placeholder="upload banner"></Input>
              </Item>
            <Item>
              <Input placeholder="upload logo"></Input>
              </Item>
            <Item>
              <Input 
                placeholder="upload event details"
                onChangeText={this.onEventDetailsChange.bind(this)}
                ></Input>
              </Item>
            <Item> 
              <Input 
                placeholder="ticket price"
                onChangeText={this.onTicketPriceChange.bind(this)}
                ></Input>
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
    events: state.adminReducer
  }
}

export default connect(mapStateToProps)(NewEvent);