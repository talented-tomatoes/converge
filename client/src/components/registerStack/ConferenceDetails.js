import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, ScrollView, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Container, Header, Text, Grid, Col, Toast, Content, Title, Body, Card, CardItem, Button, List, ListItem, Thumbnail, Left } from 'native-base';
import axios from 'axios';
import randomColor from '../helpers/randomColor';
import { connect } from 'react-redux';
import SpeakerList from './SpeakerList.js';
import Config from '../../../../config/config.js';
import RegisterStackHeader from './helpers/RegisterStackHeader';

class ConferenceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserPaid: null
    }
    this.randomColor = randomColor();
  }

  componentDidMount() {
    axios.get(`${Config.server.url}api/payments/${this.props.user.id}/${this.props.selectedConference.id}`)
    .then(result => {
      console.log(result.data);
      this.setState({
        isUserPaid: result.data
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleBuyButtonPress() {
    if (!this.state.isUserPaid) {
      this.props.navigation.navigate('PaymentForm', {conference: this.props.selectedConference});
    } else {
      Toast.show({
        text: 'Looks like you already purchased a ticket. Please visit My Events to get more info',
        position: 'bottom',
        type: 'warning',
        duration: 1500
      })
    }
  }

  render() {
    return (
      <Container>
        <RegisterStackHeader
           leftOnPress={() => this.props.navigation.navigate('ConferenceList')}
           leftIcon="arrow-back"
           title="Details"
         />
         <Content style={{padding: 10}}>
          <View>
           <Card>
             <CardItem >
               <Title>{this.props.selectedConference.name}</Title>
             </CardItem>
             <CardItem>
              <ScrollView style={{height: 140}}>
                <Text>
                  {this.props.selectedConference.details}
                </Text>
              </ScrollView>
             </CardItem>
             <CardItem>
               <Button onPress={this.handleBuyButtonPress.bind(this)}>
                 <Text style={{color: 'white'}}>Buy Ticket</Text>
               </Button>
             </CardItem>
             <Grid style={{ alignSelf: "center", flex: 0}}>
                <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
              </Grid>

          </Card>
          </View>
          <ScrollView style={{height: 350}}>
          <SpeakerList navigation={this.props.navigation} conferenceID={this.props.selectedConference.id} isUserPaid={this.state.isUserPaid} backPage={'ConferenceDetails'}/>
          </ScrollView>
         </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    selectedConference: state.attendeeReducer
  }
}

export default connect(mapStateToProps)(ConferenceDetails);
