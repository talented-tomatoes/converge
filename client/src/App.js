import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import AppStack from './Screens';
import configureStore from './configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppStack />
      </Provider>
    )
  }
}


AppRegistry.registerComponent('converge', () => App);
