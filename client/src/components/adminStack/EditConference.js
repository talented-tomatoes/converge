import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Header, Text, Icon, Button, List, ListItem, Card, Thumbnail } from 'native-base';

import EditConferenceFooter from './helpers/EditConferenceFooter';
import AdminStackHeader from './helpers/AdminStackHeader';

// import redux things
import { connect } from 'react-redux';

class EditConference extends Component {
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
    const { selectedConference } = this.props.admin
    console.log('RENDERING THE CONFERENCE DETAILS', this.props);
    return (
        <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="arrow-back"
          title="Details"
          rightNavigation="EditConferenceForm"
          rightIcon={this.props.admin.selectedConference.id ? 'create' : 'add'}
        />
        <Content>
          <List>
            <ListItem>
              <Text>Conference Name: {selectedConference.name}</Text>
              </ListItem>
            <ListItem>
              <Text>Address: {selectedConference.address}</Text>
              </ListItem>
            <ListItem>
              <Text>Start: {selectedConference.start_date} at {selectedConference.start_time}</Text>
              </ListItem>
            <ListItem>
              <Text>End: {selectedConference.end_date} at {selectedConference.end_time}</Text>
              </ListItem>
            <ListItem>
              <Text>Ticket Price: {selectedConference.ticket_price}</Text>
              </ListItem>
            <ListItem>
              <Content>
              <Text>Logo: </Text>
              <Card>
              <Thumbnail source={{uri: selectedConference.logo}} style={{height: 200, width: null, flex: 1}} />
                </Card>
                </Content>
              </ListItem>
            <ListItem>
              <Content>
              <Text>Banner: </Text>
              <Card>
              <Image source={{uri: selectedConference.banner}} style={{height: 200, width: null, flex: 1}} />
                </Card>
                </Content>
              </ListItem>
            <ListItem>
              <Content>
              <Text>Venue Map: </Text>
              <Card>
              <Image source={{uri: selectedConference.venue_map}} style={{height: 200, width: null, flex: 1}} />
                </Card>
                </Content>
              </ListItem>
            <ListItem>
              <Text>Details: {selectedConference.detail}</Text>
              </ListItem>
            

            </List>
        </Content>
        <EditConferenceFooter navigation={this.props.navigation}/>

      </Container>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.adminReducer
  };
};

export default connect(mapStateToProps)(EditConference);