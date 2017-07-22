import React, { Component } from 'react';
import { Container, Content, Header, Text, Button, Icon } from 'native-base';
import EditConferenceFooter from './helpers/EditConferenceFooter';
import EditSpeakersForm from './EditSpeakersForm';
import axios from 'axios';

// redux things
import { connect } from 'react-redux';




class EditSpeakers extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Speakers',
      headerRight: <Button transparent onPress={() => navigation.navigate('EditSpeakersForm')}><Icon name="add"/></Button>
    }
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('EDIT SPEAKERS LANDING PAGE MOUNTED');

    // make call to server to get data from DB
    axios.get
  }

  render() {
    return (
      <Container>
        {console.log('inside editspeaker landing page', this.props)}
       {/*<Header>
                 <Text>This is the header</Text>
               </Header>*/}
        <Content>
          <Text>This the body of conference {this.props.admin.currentConfID}</Text>
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
