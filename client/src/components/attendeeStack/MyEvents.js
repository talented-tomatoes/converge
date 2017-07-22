import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FlatList, Image, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Card, CardItem, Icon, Button, Title, Text } from 'native-base';

class MyEvents extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      conferences : []
    }
  }

  componentDidMount() {

    axios.get(`http://localhost:3000/api/join/conferences_users/${this.props.user.id}`)
      .then(response => {
        this.setState({
          conferences: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>My Events</Title>
          </Body>
        </Header>
        <Content>
          <FlatList
            data={this.state.conferences}
            renderItem={(event) => {
              console.log('INSIDE EVENT====>',event);
              return (
                <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Image style={{width: 80, height: 50}}source={{uri: event.item.conferences.logo}} />
                        <Text>{event.item.conferences.name}</Text>
                        <Text note>{event.item.conferences.city}, {event.item.conferences.dates}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
                        <Image source={{uri: event.item.conferences.banner}} style={{height: 115, width: 325}}/>
                      </TouchableHighlight>
                    </Body>
                  </CardItem>
                </Card>
              );
            }}
          >

          </FlatList>
          <Text>My Events</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button rounded dark onPress={() => {}}>
              <Text style={{fontSize: 15}}>My Event</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}


export default connect(mapStateToProps)(MyEvents);

