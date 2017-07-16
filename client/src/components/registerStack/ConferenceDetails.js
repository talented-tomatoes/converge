import React, { Component } from 'react';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import mockData from '../../../../db/mockData';
import SpeakerList from './SpeakerList.js';

export default class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Conference Details'
  };

  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Title>{params.conference.name}</Title>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {params.conference.details}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Button>
                <Text style={{color: 'white'}}>Register</Text>
              </Button>
            </CardItem>
         </Card>
         <SpeakerList speakers={params.conference.speakers} navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}


// AppRegistry.registerComponent('converge', () => HomeScreenNavigator);

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

/*
conference: {
          name: 'TechCrunch Disrupt',
          dates: 'Sept 18-20, 2017',
          city: 'San Francisco',
          logo: 'https://s.aolcdn.com/dims-global/dims3/GLOB/resize/1200x642/quality/80/https://tctechcrunch2011.files.wordpress.com/2014/04/tc-logo.jpg',
          banner: 'https://tctechcrunch2011.files.wordpress.com/2015/01/disruptsf2015_banner.png',
          details: 'TechCrunch Disrupt is the world’s leading authority in debuting revolutionary startups, introducing game-changing technologies and discussing what’s top of mind for the tech industry’s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.',
          speakers: [
            {
              name: 'Sam Altman',
              picture: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1447357652/stlfnd3tnusjskqulegz.png',
              bio: 'Sam Altman is the president of Y Combinator and the co-chair of OpenAI. Sam also serves on the board of Boom and Reddit. He was cofounder and CEO of Loopt, which was funded by Y Combinator in 2005 and acquired by Green Dot in 2012. Sam also founded Hydrazine Capital. He studied computer science at Stanford, and while there worked in the AI lab. \n Prior to taking over as Y Combinator\'s president, Sam was a part-time partner at Y Combinator since 2011. You can read Sam\'s essays on startups and technology at [his blog](http://blog.samaltman.com/). \n Sam has consistently been recognized for his entrepreneurship. He was featured in Inc. Magazine\'s Top 30 Entrepreneurs Under 30 and BusinessWeek\'s Tech\'s Best Entrepreneurs. \n As an early innovator in mobile location services, Sam joined Apple CEO Steve Jobs on stage at WWDC 2008, presenting Loopt as one of the first applications in the iPhone App Store. \n Sam has been a valuable source for many media outlets including Charlie Rose, CNN, The Economist, New York Times, Wall Street Journal and numerous others.',
              
            },
            {
              name: 'Alon Cohen',
              picture: '',
              bio: 'Alon Cohen is the President and co-founder of Houzz, the leading platform for home remodeling and design, bringing together both professionals and homeowners via mobile, local and social tools. Alon and his wife and cofounder, Adi Tatarko, started Houzz out of challenges that they faced during their own remodeling process. Today, millions of homeowners and more than 1.5 million active home professionals connect through Houzz.com and its mobile apps every month, sharing their photos, advice and product recommendations. Earlier in his career, Alon was a Senior Director of Engineering at eBay, where he helped start eBay\'s developer APIs and manage technology teams responsible for eBay Stores, ProStores, advertising and analytics. Before that, he worked in various software development roles and founded a software company together with his wife. Alon lives in Palo Alto with his wife and three boys. He enjoys traveling the world and playing basketball with his sons, both of which he hopes to do more often.'
            }
*/

/*
<ListItem itemHeader first>
              <Title>Speakers</Title>
            </ListItem>
              <ListItem avatar>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails')}>
                  <Left>
                    <Thumbnail small source={{ uri: 'https://crunchbase-production-res.cloudinary.com/image/upload/h_216,w_216,c_fit/v1447357652/stlfnd3tnusjskqulegz.png' }} />
                  </Left>
                </TouchableOpacity>
                <Body>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('SpeakerDetails')}>
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
*/