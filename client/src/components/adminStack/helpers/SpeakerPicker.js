import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, View, H3, Item as FormItem } from "native-base";
const Item = Picker.Item;
export default class PickerCustomHeaderExample extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // have a list of speakers in here already to render?
      selectedSpeakers: {}
    };
  }

  // on pressing the speaker, trigger a check mark
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Select your speakers</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Picker
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#f44242" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Right>
                    <Button transparent onPress={submitTheseSpeakers}>
                      <Icon name="check" style={{ color: "#fff" }} />
                    </Button>
                  </Right> 
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>Your Header</Title>
                  </Body>
                  <Right />
                </Header>}
              mode="dropdown"
              style={{ width: Platform.OS === "ios" ? undefined : 200 }}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}