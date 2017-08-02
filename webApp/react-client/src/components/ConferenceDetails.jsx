import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';


import config from '../../../../config/config';


class ConferenceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
          <h2>Conference Details</h2>

          <Link to="/EditConference"><h2>Conference Details</h2></Link>
          <Link to="/Speakers"><h2>Speakers</h2></Link>
          <Link to="/Presentations"><h2>Presentations</h2></Link>

      </div>
    )
  }
}

export default ConferenceDetails;