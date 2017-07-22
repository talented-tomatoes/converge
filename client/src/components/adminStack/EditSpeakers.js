import React, { Component } from 'react';
import { Container, Content, Header, Text, Button, Icon } from 'native-base';
import EditConferenceFooter from './helpers/EditConferenceFooter';
import EditSpeakersForm from './EditSpeakersForm';

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

  render() {

    return (
      <Container>
        {console.log('inside editspeaker landing page', this.props)}
       {/*<Header>
                 <Text>This is the header</Text>
               </Header>*/}
        <Content>
          <Text>This the body of conference {this.props.confID.confID}</Text>
        </Content>
        <EditConferenceFooter navigation={this.props.navigation}/>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    confID: state.adminReducer
  }
}

export default connect(mapStateToProps)(EditSpeakers);
