// import React, { Component } from 'react';
// import { Image } from 'react-native';
// import { Container, Content, Header, Text, Icon, Button, List, ListItem, Card, Thumbnail, Toast } from 'native-base';

// import EditConferenceFooter from './helpers/EditConferenceFooter';
// import AdminStackHeader from './helpers/AdminStackHeader';

// import EditConferenceForm from './EditConferenceForm.js';
// import axios from 'axios';
// import Config from '../../../../config/config.js';



// // import redux things
// import { connect } from 'react-redux';

// class EditConference extends Component {
//   constructor(props) {
//     super(props);

//     this.handleConferenceDelete = this.handleConferenceDelete.bind(this);
//   }
  
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: 'Conference Details',
//       headerRight: <Button transparent onPress={() => navigation.navigate('EditConferenceForm')}><Icon name="add"/></Button>,
//       headerLeft: <Button transparent onPress={() => navigation.navigate('AdminLanding')}><Icon name="arrow-back"/></Button>
//     }
//   };




//   render() {
//     const { selectedConference } = this.props.admin
//     console.log('RENDERING THE CONFERENCE DETAILS', this.props);
//     return (
//         <Container>
//         <AdminStackHeader
//           navigation={this.props.navigation}
//           leftNavigation="AdminLanding"
//           leftIcon="arrow-back"
//           title="Edit Conference"
//           rightNavigation="AdminLanding"
//           rightAction={this.handleConferenceDelete}
//           rightIcon={this.props.admin.selectedConference.id ? 'trash' : 'add'}
//         />

//         <EditConferenceForm />

//         <EditConferenceFooter navigation={this.props.navigation}/>

//       </Container>
//     );

//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     admin: state.adminReducer
//   };
// };

// export default connect(mapStateToProps)(EditConference);