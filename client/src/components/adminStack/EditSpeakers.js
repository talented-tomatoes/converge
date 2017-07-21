import React, { Component } from 'react';
import { Container, Content, Header, Text, Button, Icon } from 'native-base';

import EditConferenceFooter from './helpers/EditConferenceFooter';

import EditSpeakersForm from './EditSpeakersForm';


export default class EditSpeakers extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Speakers',
      headerRight: <Button transparent onPress={() => navigation.navigate('EditSpeakersForm')}><Icon name="add"/></Button>
    }
  };
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Container>
       {/*<Header>
                 <Text>This is the header</Text>
               </Header>*/}
        <Content>
          <Text>This the body</Text>
        </Content>
        <EditConferenceFooter navigation={this.props.navigation}/>

      </Container>
    );
  }
}