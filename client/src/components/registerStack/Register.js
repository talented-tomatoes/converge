import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Register</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button rounded dark onPress={() => {this.props.navigation.navigate('ConferenceList')}}>
              <Text style={{fontSize: 15}}>Submit as Attendee</Text>
            </Button>
            <Button rounded dark onPress={() => {this.props.navigation.navigate('CreateEvent')}}>
              <Text style={{fontSize: 15}}>Submit as Host</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

