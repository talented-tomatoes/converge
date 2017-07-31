import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem, Grid, Col } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';

// import Redux things
import { connect } from 'react-redux';
import { setSpeakerInitialValues } from '../actions/actions.js';


class SpeakersListEntry extends Component {
  constructor(props) {
    super(props);
  }

  handleSpeakerPress() {
    this.props.dispatch(setSpeakerInitialValues(this.props.speaker));
    this.props.navigation.navigate('AddSpeakersForm', {editMode: true});
  }

  render() {
    return (
      // onPress I need to go to the edit page of the speaker
      <Card>
        <TouchableOpacity onPress={this.handleSpeakerPress.bind(this)}>
          <CardItem>
          <TouchableOpacity onPress={this.handleSpeakerPress.bind(this)}>
            <Left style={{paddingRight: 15}}>
              <Thumbnail small source={{ uri: this.props.speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg' }} />
            </Left>
          </TouchableOpacity>
          <Body>
            <TouchableOpacity onPress={this.handleSpeakerPress.bind(this)}>
               <Text>{this.props.speaker.first_name + ' ' + this.props.speaker.last_name}</Text>
               <Text note>{this.props.speaker.job_title}</Text>
            </TouchableOpacity>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
          </CardItem>
          <Grid style={{ alignSelf: "center", flex: 0}}>
            <Col style={{ backgroundColor: this.props.randomColor, height: 5, flex: 1}}></Col>
          </Grid>
        </TouchableOpacity>
      </Card>


    );
  }

}

// REDUX THINGS
const mapStateToProps = (state) => {
  return {
    speakerValues: state.adminReducer
  };
};

export default connect(mapStateToProps)(SpeakersListEntry);



// <Card>
//         <CardItem onPress={() => {
//           console.log('this.props.speaker: ', this.props.speaker);
//           this.props.dispatch(setSpeakerInitialValues(this.props.speaker));
//           this.props.navigation.navigate('AddSpeakersForm', {editMode: true});
//         }}>
//           <Left>
//             <Thumbnail small source={{ uri: this.props.speaker.avatar_url }} />
//             </Left>
//           <Body>
//             <Text>{this.props.speaker.first_name} {this.props.speaker.last_name}</Text>
//             <Text note>{this.props.speaker.job_title}</Text>
//           </Body>
//         </CardItem>
//       </Card>
