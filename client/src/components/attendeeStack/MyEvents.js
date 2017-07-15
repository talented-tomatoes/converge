import React, { Component } from 'react';
import { FlatList, Image, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Footer, FooterTab, Card, CardItem, Icon, Button, Title, Text } from 'native-base';

export default class MyEvents extends Component {
  static navigationOptions = {

  };
  constructor(props) {
    super(props);
    this.state = {
      conferences : [
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        },
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        },
        {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png'
        }
      ]
    }
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
            renderItem={(event, i) => {
              console.log('this.state.conferences: ', this.state.conferences)
              return (
                <Card key={i} style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Image style={{width: 80, height: 50}}source={{uri: event.logo}} />
                        <Text>{event.name}</Text>
                        <Text note>{event.city}, {event.dates}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
                        <Image source={{uri: event.banner}} style={{height: 115, width: 325}}/>
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

