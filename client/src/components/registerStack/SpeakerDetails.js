import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../../../config/config.js';
import convertDateToEnglish from '../adminStack/helpers/convertDateToEnglish.js';
import { AppRegistry, Text, TouchableHighlight, TouchableOpacity, Image, View, ScrollView } from 'react-native';
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
    console.log('params.backPage: ', params.backPage)
    return (
      <Container>
        <RegisterStackHeader
          leftOnPress={() => this.props.navigation.navigate(params.backPage, { presentation: params.data } )}
          leftIcon="arrow-back"
          title={params.speaker.first_name + ' ' + params.speaker.last_name}
        />
        <Content style={{padding: 10}}>
          <Card style={{flex: 0}}>

              <Content style={{alignSelf: 'center', padding: 10}}>
                <Thumbnail large source={{uri: params.speaker.avatar_url}} style={{borderRadius: 60, height: 120, width: 120, flex: 1}}/>
              </Content>

              <ScrollView style={{height: 140, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
              <Text style={{padding: 10}}>
                {params.speaker.bio}
              </Text>
              </ScrollView>
            <Grid style={{ alignSelf: "center", flex: 0, paddingTop: 10}}>
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
