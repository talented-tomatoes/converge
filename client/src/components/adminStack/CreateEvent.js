import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Icon, Button, Title, Text } from 'native-base';

export default class CreateEvent extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>CreateEvent</Title>
          </Body>
        </Header>
        <Content>
          <Text>CreateEvent</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button rounded dark onPress={() => {}}>
              <Text style={{fontSize: 15}}>Create Event</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

