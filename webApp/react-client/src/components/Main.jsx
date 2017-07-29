import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import axios from 'axios';

import config from '../../../../config/config';
import { setCurrentUser } from '../actions/actions';

//the current user is hardcoded
const login_id = '106873821099349941383'


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let url = config.server.url + 'api/users/' + login_id;
    axios.get(url)
      .then(response => {
        this.props.dispatch(setCurrentUser(response.data));
      })
  }

  render () {
    console.log('this.props in main: ', this.props);
    return (
        <Grid>
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={4}>
              <Link to="/MyEvents"><h2>My Events</h2></Link>
              <Link to="/Speakers"><h2>Speakers</h2></Link>
              <Link to="/Presentations"><h2>Presentations</h2></Link>
              <Link to="/ConferenceDetails"><h2>Conference Details</h2></Link>
              <Link to="/EditProfile"><h2>Edit Profile</h2></Link>
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row><h1>Converge</h1>
              </Grid.Row>
              <Grid.Row>
                {this.props.children}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}/>

          </Grid.Row>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer,
    selectedConference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(Main);
