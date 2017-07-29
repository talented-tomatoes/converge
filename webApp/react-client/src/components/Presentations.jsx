import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { setSelectedPresentation } from '../actions/actions';
import { browserHistory } from 'react-router';



class Presentations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    }
  }

  componentDidMount() {
    let url = config.server.url + 'api/presentations/' + this.props.selectedConference.id;
    console.log('url: ', url);
    axios.get(url)
      .then(response => {
        console.log('presentations: ', response.data);
        this.setState({
          presentations: response.data
        });
      })
      .catch(err => {
        console.log('error getting presentations: ', err);
      })
  }

  render () {
    console.log('this.props in myEvents: ', this.props)
    let displayedPresentations = this.state.presentations.map((presentation, i) => {
      let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
      let randomColor = colors[Math.floor(Math.random() * (colors.length -1 + 1))];
      return (
        <Card raised color={randomColor} onClick={() => {
          this.props.dispatch(setSelectedPresentation(presentation));
          browserHistory.push('/EditPresentation');
        }} key={i}>
          <Card.Content>
            <Card.Header>{presentation.name}</Card.Header>
            <Card.Meta>{presentation.date + '   ' + presentation.time}</Card.Meta>
            <Card.Description>{presentation.location}</Card.Description>
          </Card.Content>
        </Card>
      )
    })

    return (
      <div>
        <Grid.Row>
          <h3>Presentations</h3>
        </Grid.Row>
        <Grid.Row>
          <Card.Group itemsPerRow={3}>
            {displayedPresentations}
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

export default connect(mapStateToProps)(Presentations);