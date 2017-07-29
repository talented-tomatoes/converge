import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../../../config/config.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Icon, Tab, Tabs, Content, Title, Body, Grid, Col, Row, Right, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import RegisterStackHeader from './helpers/RegisterStackHeader.js'


export default class SpeakerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presentations : []
    }
    var colors = ['#ff2d55', '#5856d6', '#007aff', '#5ac8fa', '#ffcc22', '#ff954f', '#ff3b30'];
    this.randomColor = colors[Math.floor(Math.random() * (colors.length -1 + 1))];
  }

  static navigationOptions = {
    title: 'Speaker Details'
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    axios.get(`${Config.server.url}api/join/presentations_speakers/${params.speaker.id}`)
      .then(response => {
        this.setState({
          presentations: response.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleItemPress() {

  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <RegisterStackHeader
          leftOnPress={() => this.props.navigation.navigate(params.backPage)}
          leftIcon="arrow-back"
          title="Details"
        />
        <Content style={{padding: 10}}>
          <Card style={{flex: 0}}>

            <CardItem>
              <Left>
                <Body>
                  <Title style={{paddingBottom: 10}}>{params.speaker.first_name + ' ' + params.speaker.last_name}</Title>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                  <Image source={{uri: params.speaker.avatar_url}} style={{height: 200, width: 200, flex: 1}}/>
                </Left>
                <Text style={{padding: 10}}>
                  {params.speaker.bio}
                </Text>
              </Body>
            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Title>Here's where you'll find {params.speaker.first_name + ' ' + params.speaker.last_name}</Title>
              </Body>
            </CardItem>
            <Content>
              {
                this.state.presentations.map((presentation, i) => {

                  return (
                      <List key={i}>
                        <ListItem avatar onPress={this.handleItemPress.bind(this)}>
                          <Left>
                            <Grid style={{ alignSelf: "center", flex: 0}}>
                              <Col style={{ backgroundColor: this.randomColor, height: 50, width: 5}}></Col>
                            </Grid>
                            <Text style={{paddingTop: 15, paddingLeft: 5}}>{presentation.time}</Text>
                          </Left>
                          <Body>
                            <Text>{presentation.name}</Text>
                            <Text note>{presentation.location}</Text>
                          </Body>
                          <Right>
                            <Text style={{paddingTop: 15}}>{convertDateToEnglish(presentation.date)}</Text>
                          </Right>
                        </ListItem>
                      </List>
                  )
                })
              }
            </Content>
          </Card>
        </Content>
      </Container>
    );
  }
}

/*
<ListItem onPress={this.handleItemPress.bind(this)} key={i}>
                            <Left>
                              <Grid style={{ alignSelf: "center", width: 0, flex: 0, paddingLeft: 5}}>
                                <Col style={{ backgroundColor:  colors[Math.floor(Math.random() * (colors.length - 1 + 1))], height: 50, width: 5}}></Col>
                              </Grid>
                            </Left>
                            <Body>
                              <Text>{presentation.name}}</Text>
                              <Text note>{presentation.location}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
*/