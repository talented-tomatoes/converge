import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import mockData from '../../../../db/mockData';
import SpeakerList from './SpeakerList.js';

export default class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Conference Details'
  };

  render() {

    const METHOD_DATA = [{
              supportedMethods: ['apple-pay'],
              data: {
                merchantIdentifier: 'merchant.com.converge',
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                countryCode: 'US',
                currencyCode: 'USD'
              }
            }];

    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: 'Movie Ticket',
          amount: { currency: 'USD', value: '15.00' }
        }
      ],
      total: {
        label: 'Merchant Name',
        amount: { currency: 'USD', value: '15.00' }
      }
    };

    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

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
              <Button onPress={() => {paymentRequest.show()}}>
                <Text style={{color: 'white'}}>Register</Text>
              </Button>
            </CardItem>
         </Card>
         <SpeakerList speakers={params.conference.speakers} navigation={this.props.navigation}/>
        </Content>
        <Content>

        </Content>
      </Container>
    );
  }
}
