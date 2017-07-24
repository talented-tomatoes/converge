import React, { Component } from 'react';
import { Container, Content, Header, Text, Icon, Button } from 'native-base';

import EditConferenceFooter from './helpers/EditConferenceFooter';

export default class EditConference extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Conference Details',
      headerRight: <Button transparent onPress={() => navigation.navigate('EditConferenceForm')}><Icon name="add"/></Button>,
      headerLeft: <Button transparent onPress={() => navigation.navigate('AdminLanding')}><Icon name="arrow-back"/></Button>
    }
  };

  constructor(props) {
    super(props);


  }

  render() {

    return (
        <Container>
        <Content>
          <Text>This the body</Text>
        </Content>
        <EditConferenceFooter navigation={this.props.navigation}/>

      </Container>
    );

  }
}