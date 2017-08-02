import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Menu, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import axios from 'axios';

import config from '../../../../config/config';
import { setCurrentUser } from '../actions/actions';
import { browserHistory } from 'react-router';

class EventMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Presentations'
    }
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log('click works');
    this.setState({
      activeItem: name
    })
    if (name === 'My Events') {
      browserHistory.push('/MyEvents');
    } else if (name === 'Presentations') {
      browserHistory.push('/Presentations');
    } else if (name === 'Speakers') {
      browserHistory.push('/Speakers');
    } else if (name === 'Details') {
      browserHistory.push('/EditConference');
    } else if (name === 'Edit Profile') {
      browserHistory.push('/EditProfile');
    }
  }

  render () {
    const { activeItem } = this.state;
    console.log('this.props in EventMenu: ', this.props);
    return (
      <div>
        <Menu tabular widths="5" inverted style={{backgroundColor: '#428bca'}}>
          <Menu.Item style={this.state.activeItem === 'My Events' ? styles.tabSelected : {color: 'white'}} name='My Events' active={activeItem === 'My Events'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Presentations' ? styles.tabSelected : {color: 'white'}} name='Presentations' active={activeItem === 'Presentations'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Speakers' ? styles.tabSelected : {color: 'white'}} name='Speakers' active={activeItem === 'Speakers'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Details' ? styles.tabSelected : {color: 'white'}} name='Details' active={activeItem === 'Details'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Edit Profile' ? styles.tabSelected : {color: 'white'}} name='Edit Profile' active={activeItem === 'Edit Profile'} onClick={this.handleItemClick.bind(this)} />
        </Menu>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer,
    selectedConference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(EventMenu);

const styles = {
  tabSelected: {
    backgroundColor: 'rgb(200, 199, 204)',
    borderWidth: 0,
    fontSize: 20
  }
}


//         </Menu>

// <Grid>
//           <Grid.Row />
//           <Grid.Row>
//             <Grid.Column width={4}>
//               <Link to="/MyEvents"><h2>My Events</h2></Link>
//               <Link to="/Speakers"><h2>Speakers</h2></Link>
//               <Link to="/Presentations"><h2>Presentations</h2></Link>
//               <Link to="/ConferenceDetails"><h2>Conference Details</h2></Link>
//               <Link to="/EditProfile"><h2>Edit Profile</h2></Link>
//             </Grid.Column>
//             <Grid.Column width={11}>
//               <Grid.Row><h1>Converge</h1>
//               </Grid.Row>
//               <Grid.Row>
//                 {this.props.children}
//               </Grid.Row>
//             </Grid.Column>
//             <Grid.Column width={1}/>

//           </Grid.Row>
//         </Grid>