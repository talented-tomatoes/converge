import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';

export default class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference: {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png',
          details: 'TechCrunch Disrupt is the world’s leading authority in debuting revolutionary startups, introducing game-changing technologies and discussing what’s top of mind for the tech industry’s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.'
      }
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Conference Details',
  };

  handleAvatarPress() {
    console.log('hi avatar pressed');
  }

  render() {
    const { conference } = this.state; 
    return (
      <Container>
        <Header>
          <Body>
            <Title>Conference Details</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Title>{conference.name}</Title>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {conference.details}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button>
                <Text style={{color: 'white'}}>Register</Text>
              </Button>
            </CardItem>
         </Card>
         <List>
           <ListItem itemHeader first>
              <Title>Speakers</Title>
            </ListItem>
                <ListItem avatar>
                  <TouchableOpacity onPress={this.handleAvatarPress}>
                    <Left>
                      <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1447357652/stlfnd3tnusjskqulegz.png' }} />
                    </Left>
                  </TouchableOpacity>
                  <Body>
                    <TouchableOpacity onPress={this.handleAvatarPress}>
                      <Text>Sam Altman</Text>
                    </TouchableOpacity>
                  </Body>
                </ListItem>
            <ListItem avatar>
              <Left>
               <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1498767923/m5s53k1wxfn4voencxse.jpg' }} />
              </Left>
              <Body>
                <Text>Alon Cohen</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1498271720/henuqqwqpzyd9oilaryn.jpg' }} />
              <Body>
                <Text>Kevin Durant</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1499276664/igdxa5v2imooppnqcest.png' }} />
              <Body>
                <Text>Anna Fang</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1497385032/svjg33cd6utummtemme2.png' }} />
              <Body>
                <Text>John Giannandrea</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}


AppRegistry.registerComponent('converge', () => HomeScreenNavigator);

/*
<Card>
            <CardItem header>
              <Title>Speakers</Title>
            </CardItem>
            <CardItem>
              <List>
                <ListItem>
                  <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
                  <Body>
                    <Text>Sankhadeep</Text>
                    <Text note>Its time to build a difference . .</Text>
                  </Body>
                </ListItem>
              </List>
            </CardItem>
            <CardItem footer>
              <Button>
                <Text style={{color: 'white'}}>Register</Text>
              </Button>
            </CardItem>
         </Card>
*/
