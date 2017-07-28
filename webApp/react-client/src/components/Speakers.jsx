import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, PageHeader, small } from 'react-bootstrap';
import config from '../../../../config/config';


class Speakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // componentDidMount() {
  //   let url = config.server.url + 'api/speakers/1';
  //   axios.get(url)
  //     .then(response => {
  //       console.log('response: ', response.data);
  //       this.setState({
  //         conferences: response.data
  //       })
  //     })
  // }

  render () {
    return (
      <div>
          <h2>Speakers</h2>
      </div>
    )
  }
}

export default Speakers;