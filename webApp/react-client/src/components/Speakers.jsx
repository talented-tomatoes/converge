import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { setSelectedSpeaker } from '../actions/actions';
import { browserHistory } from 'react-router';



class Speakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: []
    }
  }

  componentDidMount() {
    let url = config.server.url + 'api/speakers/' + this.props.selectedConference.id;
    console.log('url: ', url);
    axios.get(url)
      .then(response => {
        console.log('speakers: ', response.data);
        this.setState({
          speakers: response.data
        });
      })
      .catch(err => {
        console.log('error getting speakers: ', err);
      })
  }

  render () {
    console.log('this.props in myEvents: ', this.props)
    let displayedSpeakers = this.state.speakers.map((speaker, i) => {
      let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
      let randomColor = colors[Math.floor(Math.random() * (colors.length -1 + 1))];
      return (
        <Card raised color={randomColor} onClick={() => {
          this.props.dispatch(setSelectedSpeaker(speaker));
          browserHistory.push('/EditSpeaker');
        }} key={i}>
          <Image src={speaker.avatar_url} />
          <Card.Content>
            <Card.Header>{speaker.first_name + ' ' + speaker.last_name}</Card.Header>
            <Card.Meta>{speaker.job_title}</Card.Meta>
            <Card.Description>{speaker.email}</Card.Description>
          </Card.Content>
        </Card>
      )
    })

    return (
      <div>
        <Grid.Row>
          <h3>My Events</h3>
        </Grid.Row>
        <Grid.Row>
          <Card.Group itemsPerRow={3}>
            {displayedSpeakers}
          </Card.Group>
        </Grid.Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedConference: state.conferenceReducer.selectedConference
  }
}

export default connect(mapStateToProps)(Speakers);