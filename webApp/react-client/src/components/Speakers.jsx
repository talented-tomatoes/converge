import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';

import { connect } from 'react-redux';
import { setSelectedSpeaker } from '../actions/actions';
import { browserHistory } from 'react-router';
import randomColor from './helpers/randomColor';
import truncateString from './helpers/truncateString';


class Speakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakers: []
    }
    this.randomColor = randomColor();
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
      return (
        <Card raised centered style={{borderBottom: 'medium solid ' + randomColor(), width: 212}} onClick={() => {
          this.props.dispatch(setSelectedSpeaker(speaker));
          browserHistory.push('/EditSpeaker');
        }} key={i}>
          <Image style={{width: 212, height: 212}} src={speaker.avatar_url} />
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
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)'}}>
          <Grid.Row>
            <Card.Group style={{margin: 10}} itemsPerRow={5}>
              <Card raised style={{border: 'medium dashed black', width: 212, height: 212, backgroundColor: 'rgb(200, 199, 204)'}} onClick={() => {
                this.props.dispatch(setSelectedSpeaker({}));
                browserHistory.push('/EditSpeaker');
              }}>
                <Image style={{width: 212}} src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-alphanumeric/070928-glossy-black-icon-alphanumeric-plus-sign-simple.png" />
              </Card>
              {displayedSpeakers}
            </Card.Group>
          </Grid.Row>
        </Grid>
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