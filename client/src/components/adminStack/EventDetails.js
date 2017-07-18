import React, { Component } from 'react';
import { Text, Container, Content } from 'native-base';

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Text>EVENTS DETAIL PAGE FOR {params.eventName} </Text>
    );
  }

}