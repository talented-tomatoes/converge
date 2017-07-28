import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { setSelectedConference } from '../actions/actions';
import { browserHistory } from 'react-router';


class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: []
    }
  }

  componentDidMount() {
    let url = config.server.url + 'api/getConferencesByHostID/1';
    axios.get(url)
      .then(response => {
        console.log('response: ', response.data);
        this.setState({
          conferences: response.data
        })
      })
  }

  render () {
    console.log('this.props in myEvents: ', this.props)
    let displayedConferences = this.state.conferences.map((conference, i) => {
      return (
        // <Link to="/SelectedConference">
        <Card onClick={() => {
          this.props.dispatch(setSelectedConference(conference));
          browserHistory.push('/SelectedConference');


        }} raised key={i}>
          <Card.Header>
            <Image floated='left' size='mini' src={conference.logo} />
            {conference.name}
          </Card.Header>
          <Image src={conference.banner} />
          <Card.Meta>
            {conference.start_date} to {conference.end_date}
          </Card.Meta>
        </Card>
        // </Link>
      )
    })
    return (
      <div>
        <Grid.Row>
          <h3>My Events</h3>
        </Grid.Row>
        <Grid.Row>
          <Card.Group itemsPerRow={3}>
            {displayedConferences}
          </Card.Group>
        </Grid.Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedConference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(MyEvents);