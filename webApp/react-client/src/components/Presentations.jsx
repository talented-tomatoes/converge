import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';

import { connect } from 'react-redux';
import { setSelectedPresentation } from '../actions/actions';
import { browserHistory } from 'react-router';
import randomColor from './helpers/randomColor';
import truncateString from './helpers/truncateString';
import EventMenu from './EventMenu.jsx';



class Presentations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    }
    this.randomColor = randomColor();
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

      return (
        <Card raised style={{borderBottom: 'medium solid ' + randomColor(),  width: 212}} onClick={() => {
          this.props.dispatch(setSelectedPresentation(presentation));
          browserHistory.push('/EditPresentation');
        }} key={i}>
          <Card.Content>
            <Card.Header>{truncateString(presentation.name, 82)}</Card.Header>
            <Card.Meta>{presentation.date + '   ' + presentation.time}</Card.Meta>
            <Card.Description>{presentation.location}</Card.Description>
          </Card.Content>
        </Card>
      )
    })

    return (
      <div>
        <EventMenu currentPage='Presentations'/>
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)'}}>
          <Grid.Row>
            <Card.Group style={{margin: 10}} itemsPerRow={5}>
            <Card raised style={{border: 'medium dashed black', width: 212, backgroundColor: 'rgb(200, 199, 204)'}} onClick={() => {
                this.props.dispatch(setSelectedPresentation({}));
                browserHistory.push('/EditPresentation');
              }}>
              <Image style={{width: 212}} src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-alphanumeric/070928-glossy-black-icon-alphanumeric-plus-sign-simple.png" />
            </Card>
            {displayedPresentations}
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

export default connect(mapStateToProps)(Presentations);