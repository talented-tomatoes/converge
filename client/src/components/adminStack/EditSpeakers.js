import React, { Component } from 'react';
import { Container, Content, List, ListItem, Header, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import EditConferenceFooter from './helpers/EditConferenceFooter';
import EditSpeakersForm from './EditSpeakersForm';
import axios from 'axios';

// redux things
import { connect } from 'react-redux';




class EditSpeakers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speakers: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Speakers',
      headerRight: <Button transparent onPress={() => navigation.navigate('EditSpeakersForm')}><Icon name="add"/></Button>
    }
  };

  componentDidMount() {
    console.log('EDIT SPEAKERS LANDING PAGE MOUNTED');
    // make server call to get speakers from DB based on currentConfID;

    let url = 'http://localhost:3000/api/getSpeakersByConfID/' + this.props.admin.currentConfID;

    axios.get(url)
      .then(response => {
        console.log('response in SPEAKER LANDING: ', response);
        // on speakers data coming in, store it in local state
        this.setState({
          speakers: response.data
        }, function() {console.log('state changed to :', this.state.speakers)});
      })
      .catch(err => {
        console.log('error getting conference speakers: ', err);
      })

  }

  render() {
    return (
      <Container>
       {/*<Header><Text>This is the header</Text></Header>*/}
        <Content>
          <List>

             {this.state.speakers.map((speaker) => {
              return (
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: speaker.avatar_url || 'https://rentcircles.com/assets/no-pic.jpg'}} />
                    </Left>
                  <Body>
                    <Text>{speaker.first_name} {speaker.last_name}</Text>
                    <Text note>{speaker.job_title}</Text>
                    </Body>
                  </ListItem>
              );
            })} 
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
  }
}

export default connect(mapStateToProps)(EditSpeakers);
