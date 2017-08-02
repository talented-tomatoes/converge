import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Menu, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setSelectedConference } from '../actions/actions';

import axios from 'axios';

import config from '../../../../config/config';
import { setCurrentUser } from '../actions/actions';
import { browserHistory } from 'react-router';

class EventMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.currentPage || 'Presentations'
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
    } else if (name === 'Log Out') {
      console.log('log out user');
    }
  }

  render () {
    const { activeItem } = this.state;
    console.log('this.props in EventMenu: ', this.props);
    return (
      <div>
        <Menu tabular widths="6" inverted style={{backgroundColor: '#428bca', padding: 15}}>
          <Menu.Item style={this.state.activeItem === 'My Events' ? styles.tabSelected : {color: 'white'}} name='My Events' active={activeItem === 'My Events'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Presentations' ? styles.tabSelected : {color: 'white'}} name='Presentations' active={activeItem === 'Presentations'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Speakers' ? styles.tabSelected : {color: 'white'}} name='Speakers' active={activeItem === 'Speakers'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Details' ? styles.tabSelected : {color: 'white'}} name='Details' active={activeItem === 'Details'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Edit Profile' ? styles.tabSelected : {color: 'white'}} name='Edit Profile' active={activeItem === 'Edit Profile'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Logout' ? styles.tabSelected : {color: 'white'}} name='Logout' active={activeItem === 'Logout'} onClick={this.handleItemClick.bind(this)} />
        </Menu>
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
    // fontSize: 20
  }
}