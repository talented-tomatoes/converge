import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Header, Text, Icon, Button, List, ListItem, Card, Thumbnail, CardItem, Left, Right, Body, Grid, Col, Title } from 'native-base';

import EditConferenceFooter from './helpers/EditConferenceFooter';
import AdminStackHeader from './helpers/AdminStackHeader';
import EditConferenceForm from './EditConferenceForm';

import convertDateToEnglish from './helpers/convertDateToEnglish';
import randomColor from '../helpers/randomColor';

// import redux things
import { connect } from 'react-redux';

class EditConference extends Component {
  constructor(props) {
    super(props);
    this.randomColor = randomColor();
  }

  render() {
    const { selectedConference } = this.props.admin
    var year = selectedConference.start_date.slice(0, 4);
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
        <Content style={{padding: 10}}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: selectedConference.logo}} />
                <Body>
                  <Text>{selectedConference.name}</Text>
                  <Text note> {`${convertDateToEnglish(selectedConference.start_date)}, ${year} to ${convertDateToEnglish(selectedConference.end_date)}, ${year}`}</Text>
                  <Text note> {`${selectedConference.start_time} to ${selectedConference.end_time}`}</Text>
                  </Body>
                </Left>
            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
            <CardItem cardBody>
              <Image
                source={{uri: selectedConference.banner}}
                style={{height: 200, width: null, flex: 1}}
                />
            </CardItem>

          </Card>
          <Card>
            <CardItem>
              <Text style={{fontWeight: 'bold'}}>Conference Details</Text>
            </CardItem>
            <Grid style={{ alignSelf: "center", flex: 0}}>
              <Col style={{ backgroundColor: this.randomColor, height: 5, flex: 1}}></Col>
            </Grid>
            <CardItem>
              <Text>{selectedConference.details}</Text>
            </CardItem>

          </Card>
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

// <Content>
//           <List>
//             <ListItem>
//               <Text>Conference Name: {selectedConference.name}</Text>
//               </ListItem>
//             <ListItem>
//               <Text>Address: {selectedConference.address}</Text>
//               </ListItem>
//             <ListItem>
//               <Text>Start: {selectedConference.start_date} at {selectedConference.start_time}</Text>
//               </ListItem>
//             <ListItem>
//               <Text>End: {selectedConference.end_date} at {selectedConference.end_time}</Text>
//               </ListItem>
//             <ListItem>
//               <Text>Ticket Price: {selectedConference.ticket_price}</Text>
//               </ListItem>
//             <ListItem>
//               <Content>
//               <Text>Logo: </Text>
//               <Card>
//               <Thumbnail source={{uri: selectedConference.logo}} style={{height: 200, width: null, flex: 1}} />
//                 </Card>
//                 </Content>
//               </ListItem>
//             <ListItem>
//               <Content>
//               <Text>Banner: </Text>
//               <Card>
//               <Image source={{uri: selectedConference.banner}} style={{height: 200, width: null, flex: 1}} />
//                 </Card>
//                 </Content>
//               </ListItem>
//             <ListItem>
//               <Content>
//               <Text>Venue Map: </Text>
//               <Card>
//               <Image source={{uri: selectedConference.venue_map}} style={{height: 200, width: null, flex: 1}} />
//                 </Card>
//                 </Content>
//               </ListItem>
//             <ListItem>
//               <Text>Details: {selectedConference.detail}</Text>
//               </ListItem>


//             </List>
//         </Content>