import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import mockData from '../../../../db/mockData';
import SpeakerList from './SpeakerList.js';

export default class ConferenceDetails extends Component {

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

        var paymentDetails = {
          token: paymentResponse.details.paymentToken,
          details: DETAILS
        }

        fetch('http://localhost:3000/api/payments/charge', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentDetails)
        });
        paymentResponse.complete('success');
      })
      .catch(e => {
        paymentRequest.abort();
        console.log(e.message);
      });
  }
 
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
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
              <Button onPress={this.handlePaymentRequest}>
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
