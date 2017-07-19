import React from 'react';
import { Content, Button, Text } from 'native-base';
import Swiper from 'react-native-swiper';

const saveToDB = (userType, callback) => {
      let user = callback();
      user.usertype = userType;
      console.log('user: ', user);
    }

module.exports = (props) => (
  <Content style={{flex:1}}>
    <Swiper style={{backgroundColor: '#428bca'}} showsButtons={false}>
        <Button style={{alignSelf: 'center'}}transparent onPress={() => {
            saveToDB('attendee', props.handleSubmit);
            props.navigation.navigate('ConferenceList')
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Register as Attendee</Text>
        </Button>
      <Button style={{alignSelf: 'center'}}transparent onPress={() => {
          saveToDB('host', props.handleSubmit);
          props.navigation.navigate('AdminStack')}
        }>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Register as Host</Text>
      </Button>
    </Swiper>
  </Content>
)