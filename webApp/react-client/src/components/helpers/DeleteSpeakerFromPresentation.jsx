import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../../config/config.js';

import { connect } from 'react-redux';

class DeleteSpeakerFromPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSpeakers: []
    }
  }

  componentDidMount() {
    let selectedSpeakersUrl = config.server.url + 'api/speakers/presentation/' + this.props.selectedPresentation.id;

    axios.get(selectedSpeakersUrl)
      .then(response => {
        this.setState({
          selectedSpeakers: response.data
        })
      })
      .catch(err => {
        console.log('error retrieiving selectedSpeakers: ', err);
      })
  }

  deleteSpeakerFromPresentation(id) {
    console.log('target: ', id);
    axios.delete(config.server.url + 'api/speakers/' +  id + '/' + this.props.selectedPresentation.id)
      .then(response => {
        console.log('response: ', response);
        for (let i = 0; i < this.state.selectedSpeakers.length; i++) {
          if (this.state.selectedSpeakers[i].id === id) {
            this.state.selectedSpeakers.splice(i, 1)
            this.setState({
              selectedSpeakers: this.state.selectedSpeakers
            }, console.log('state changed to: ', this.state.selectedSpeakers));
          }
        }
      })
      .catch(err => {
        console.log('error deleting speaker form presentation: ', err);
      })
  }

  render() {
    let speakerButtons = this.state.selectedSpeakers.map((speaker, i) => {
      console.log('rendered: ', speaker);
      return (
        <Button animated='vertical' key={i} onClick={(e) => {
          e.preventDefault()
          this.deleteSpeakerFromPresentation.call(this, speaker.id)}
        }>
          <Button.Content visible>{speaker.first_name + ' ' + speaker.last_name}</Button.Content>
          <Button.Content hidden>
            <Icon name='trash outline' />
          </Button.Content>
        </Button>
      )
    })
    return (
      <div>
        {speakerButtons}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPresentation: state.presentationReducer.selectedPresentation,
    selectedConference: state.conferenceReducer.selectedConference
  }
}

export default connect(mapStateToProps)(DeleteSpeakerFromPresentation);