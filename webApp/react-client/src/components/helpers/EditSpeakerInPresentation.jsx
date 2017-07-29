import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../../config/config.js';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const DropdownFormField = ({input, value, label, width, data, meta: { touched, error, warning }}) => (
 <Form.Field>
   <Dropdown selection
             multiple
             fluid
             options={data}
             value={input.value}
             onChange={(param,data) => input.onChange(data.value)}
             placeholder={label}
   />
  </Form.Field>
)

class EditSpeakerInPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpeakers: []
    }
  }

  componentDidMount() {
    let allSpeakersUrl = config.server.url + 'api/speakers/' + this.props.selectedConference.id;
    axios.get(allSpeakersUrl)
      .then(response => {
        let allSpeakers = response.data.map((speaker, i) => {
          return (
              {
                key: speaker.id,
                text: speaker.first_name + ' ' + speaker.last_name,
                value: speaker.id,
              }
          )
        });
        this.setState({
          allSpeakers: allSpeakers
        });
      })
      .catch(err => {
        console.log('error getting allSpeakers: ', err);
      })
  }

  render() {
    // console.log('this.state.allSpeakers: ', this.state.allSpeakers);
    return (
      <Field name="selectedSpeakers" component={ DropdownFormField }
            label="All Speakers" data={this.state.allSpeakers}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedConference: state.conferenceReducer.selectedConference
  }
}

export default connect(mapStateToProps)(EditSpeakerInPresentation);