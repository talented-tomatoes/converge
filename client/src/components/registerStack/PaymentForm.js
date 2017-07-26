import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text, Separator, Item, Label, Input } from 'native-base';
import RegisterStackHeader from './helpers/RegisterStackHeader';
import Config from '../../../../config/config.js';
import axios from 'axios';

import { LiteCreditCardInput } from "react-native-credit-card-input";

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: {valid: false}
    }
    // let { params } = this.props.navigation.state;
    // DETAILS = {
    //   id: 'basic-example',
    //   displayItems: [
    //     {
    //       label: `${params.conference.name} ticket`,
    //       amount: { currency: 'USD', value: params.conference.ticket_price }
    //     }
    //   ],
    //   total: {
    //     label: 'Converge',
    //     amount: { currency: 'USD', value: params.conference.ticket_price }
    //   }
    // };
  }

  handlePaymentRequest() {
    console.log('applePayment handled');
    let { params } = this.props.navigation.state
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
          label: `${params.conference.name} ticket`,
          amount: { currency: 'USD', value: params.conference.ticket_price }
        }
      ],
      total: {
        label: 'Converge',
        amount: { currency: 'USD', value: params.conference.ticket_price }
      }
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest.show()
      .then(paymentResponse => {

        var paymentDetails = {
          token: paymentResponse.details.paymentToken,
          details: DETAILS,
          conference_id: params.conference.id,
          user_id: this.props.user.id
        }
        const SERVER_URL = Config.server.url || 'http://localhost:3000';
        axios.post(SERVER_URL + 'api/payments/charge', paymentDetails)
          .then(response => {
            return response;
          })
          .then(response => {
            return axios.post(SERVER_URL + 'api/join/conferences_users', paymentDetails)
          })
          .then(response => {
            paymentResponse.complete('success');
            this.props.navigation.navigate('MyEvents');
          })
          .catch(error => {
            console.log(error);
            paymentRequest.abort();
          })
      })
  }

  processCreditCardPayment(card) {
    let { params } = this.props.navigation.state
    var cardDetails = {
      "card[number]": card.number,
      "card[exp_month]": card.expiry.substr(0,2),
      "card[exp_year]": card.expiry.substr(3),
      "card[cvc]": card.cvc
    };
    var formBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const DETAILS = {
      id: 'basic-example',
      displayItems: [
        {
          label: `${params.conference.name} ticket`,
          amount: { currency: 'USD', value: params.conference.ticket_price }
        }
      ],
      total: {
        label: 'Converge',
        amount: { currency: 'USD', value: params.conference.ticket_price }
      }
    };

    fetch('https://api.stripe.com/v1/tokens', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + 'pk_test_XvGWkr3d77Bulcj72lSfboG2'
      },
      body: formBody
    }).then(response => response.json())
    .then(paymentResponse => {
      console.log('response: ', paymentResponse);
      var paymentDetails = {
          token: paymentResponse.id,
          details: DETAILS,
          conference_id: params.conference.id,
          user_id: this.props.user.id
        }
        const SERVER_URL = Config.server.url;
        axios.post(SERVER_URL + 'api/payments/charge', paymentDetails)
          .then(response => {
            return response;
          })
          .then(response => {
            return axios.post(SERVER_URL + 'api/join/conferences_users', paymentDetails)
          })
          .then(response => {
            console.log('payment successful: ', response);
            this.props.navigation.navigate('MyEvents');
          })
          .catch(error => {
            console.log('error processing payment: ', error);
            alert('error processing payment');
          })
    }).catch(err => console.log('error processing payment: ', error));
  }

  _onChange(form) {
    console.log(form);
    if (form.valid === true) {
      this.setState({
        cardInfo: form
      });
    }
  }

  render() {
    return (
      <Container>
      <RegisterStackHeader
          leftOnPress={() => this.props.navigation.navigate('ConferenceDetails',{conference: this.props.navigation.state.params.conference})}
          leftIcon="arrow-back"
          title="Payment"
        />
      <Content>
        <Button style={{backgroundColor: 'grey'}} full onPress={() => this.handlePaymentRequest()} >
          <Text> Pay with Apple Pay </Text>
        </Button>

        <Separator bordered />

        <LiteCreditCardInput onChange={this._onChange.bind(this)} />
        {
          this.state.cardInfo.valid ? (
            <Button success full onPress={() => this.processCreditCardPayment(this.state.cardInfo.values)} >
              <Text> Submit </Text>
            </Button>) : (
            <Button danger full onPress={() => alert('Credit Card Not Valid')} >
              <Text> Pay With Credit Card </Text>
            </Button>)
        }
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

export default connect(mapStateToProps)(PaymentForm);