import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image, Menu } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../config/config';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { setSelectedConference } from '../actions/actions';
import { browserHistory } from 'react-router';
import randomColor from './helpers/randomColor';


class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: [],
      activeItem: 'My Events'
    }
    this.randomColor = randomColor();
  }

  componentDidMount() {
    let url = config.server.url + 'api/getConferencesByHostID/5';
    axios.get(url)
      .then(response => {
        console.log('response: ', response.data);
        this.setState({
          conferences: response.data
        });
      });
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log('click works');
    this.setState({
      activeItem: name
    })
    if (name === 'My Events') {
      browserHistory.push('/MyEvents');
    } else if (name === 'Add Conference') {
      this.props.dispatch(setSelectedConference({}));
      browserHistory.push('/EditConference');
    }
  }

  render () {
    console.log('this.props in myEvents: ', this.props)
    let displayedConferences = this.state.conferences.map((conference, i) => {

      return (
        <Card raised style={{padding: 10, borderBottom: 'medium solid ' + randomColor(), width: 212}} onClick={() => {
          console.log('events data, ', conference);
          this.props.dispatch(setSelectedConference(conference));
          browserHistory.push('/Presentations');
        }} key={i}>
          <Card.Header>
            <Image floated='left' size='mini' src={conference.logo} />
            {conference.name}
          </Card.Header>
          <Image src={conference.banner} />
          <Card.Meta>
            {conference.start_date} to {conference.end_date}
          </Card.Meta>
        </Card>
      )
    })
    const { activeItem } = this.state;
    return (
      <div>
        <Menu tabular widths="6" inverted style={{backgroundColor: '#428bca'}}>
          <Menu.Item style={this.state.activeItem === 'My Events' ? styles.tabSelected : {color: 'white'}} name='My Events' active={activeItem === 'My Events'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item style={this.state.activeItem === 'Add Conference' ? styles.tabSelected : {color: 'white'}} name='Add Conference' active={activeItem === 'Add Conference'} onClick={this.handleItemClick.bind(this)} />
        </Menu>
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)'}}>
          <Grid.Row>
            <Card.Group itemsPerRow={5} style={{margin: 10}}>
              {displayedConferences}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedConference: state.conferenceReducer
  }
}

export default connect(mapStateToProps)(MyEvents);

const styles = {
  tabSelected: {
    backgroundColor: 'rgb(200, 199, 204)',
  }
}