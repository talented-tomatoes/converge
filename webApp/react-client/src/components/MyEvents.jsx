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
        })
      })
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log('click works');
    this.setState({
      activeItem: name
    })
  }

  render () {
    console.log('this.props in myEvents: ', this.props)
    let displayedConferences = this.state.conferences.map((conference, i) => {

      return (
        <Card raised style={{padding: 10, borderBottom: 'medium solid ' + randomColor(), width: 212}} onClick={() => {
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
        <Menu tabular widths="5" inverted style={{backgroundColor: '#428bca'}}>
          <Menu.Item style={this.state.activeItem === 'My Events' ? styles.tabSelected : {color: 'white'}} name='My Events' active={activeItem === 'My Events'} onClick={this.handleItemClick.bind(this)} />
        </Menu>
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)'}}>
          <Grid.Row>
            <Card.Group itemsPerRow={5} style={{margin: 10}}>
              <Card raised style={{border: 'medium dashed black', width: 212, backgroundColor: 'rgb(200, 199, 204)'}} onClick={() => {
                this.props.dispatch(setSelectedConference({}));
                browserHistory.push('/EditConference');
              }}>
                <Image style={{width: 212}} src="http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-alphanumeric/070928-glossy-black-icon-alphanumeric-plus-sign-simple.png" />
              </Card>
              {displayedConferences}
            </Card.Group>
          </Grid.Row>
        </Grid>
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

const styles = {
  tabSelected: {
    backgroundColor: 'rgb(200, 199, 204)',
    borderWidth: 0,
    fontSize: 20
  }
}