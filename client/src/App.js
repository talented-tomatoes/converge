import React, { Component } from 'react';
import { Root } from "native-base";
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import AppStack from './Screens';
import configureStore from './configureStore';

global.PaymentRequest = require('react-native-payments').PaymentRequest;

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Root>
          <AppStack />
        </Root>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('converge', () => App);