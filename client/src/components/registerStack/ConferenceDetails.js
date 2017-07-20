import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import SpeakerList from './SpeakerList.js';

class ConferenceDetails extends Component {

  static navigationOptions = {
    title: 'Conference Details'
  };

  constructor(props) {
    super(props);
  }

  handlePaymentRequest() {
    const METHOD_DATA = [{
      supportedMethods: ['apple-pay'],
      data: {
        merchantIdentifier: 'merchant.com.converge',
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        countryCode: 'US',
        currencyCode: 'USD',
        paymentMethodTokenizationParameters: {
          parameters: {
            'gateway': 'stripe',
            'stripe:publishableKey': 'pk_test_XvGWkr3d77Bulcj72lSfboG2'
          }
        }
      }
    }];
    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Event Reservation',
          amount: { currency: 'USD', value: '15.00' }
        }
      ],
      total: {
        label: 'Converge',
        amount: { currency: 'USD', value: '15.00' }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    
    paymentRequest.show()
      .then(paymentResponse => {

        let { params } = this.props.navigation.state

        var paymentDetails = {
          token: paymentResponse.details.paymentToken,
          details: DETAILS,
          conference_id: params.conference.id,
          user_id: this.props.user.id
        }

        axios.post('http://localhost:3000/api/payments/charge', paymentDetails)
          .then(response => {
            return response;
          })
          .then(response => {
            return axios.post('http://localhost:3000/api/join/conferences_users', paymentDetails)
          })
          .then(response => {
            paymentResponse.complete('success');
          })
          .catch(error => {
            console.log(error);
            paymentRequest.abort();
          })
      })
  }
 
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    console.log(this.props)
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Title>{params.conference.name}</Title>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {params.conference.details}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button onPress={this.handlePaymentRequest.bind(this)}>
                <Text style={{color: 'white'}}>Attend</Text>
              </Button>
            </CardItem>
         </Card>
         <SpeakerList navigation={this.props.navigation} conferenceID={params.conference.id}/>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(ConferenceDetails);
