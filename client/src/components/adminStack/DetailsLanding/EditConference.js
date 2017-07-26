import React, { Component } from 'react';
import { Container, Content, Header, Text, Icon, Button } from 'native-base';

import EditConferenceFooter from '../helpers/EditConferenceFooter';
import AdminStackHeader from '../helpers/AdminStackHeader';

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

  // ACCESS THE CURRENT EVENT WE ARE AT WITH:
    // this.props.admin.selectedConference


  render() {
    console.log('RENDERING THE CONFERENCE DETAILS', this.props);
    return (
        <Container>
        <AdminStackHeader
          navigation={this.props.navigation}
          leftNavigation="AdminLanding"
          leftIcon="arrow-back"
          title="Details"
          rightNavigation="EditConferenceForm"
          rightIcon= "add"
        />
        <Content>
          <Text>{JSON.stringify(this.props.admin.selectedConference)}</Text>
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