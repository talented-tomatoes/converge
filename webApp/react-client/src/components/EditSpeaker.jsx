import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../../config/config.js';

import UploadPicture from './helpers/UploadPicture.jsx';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import EventMenu from './EventMenu.jsx';
import defaultImage from './helpers/defaultImage';





const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
);
const renderTextAreaField = ({input, label, placeholder, width, height, meta: { touched, error, warning }}) => (
  <Form.TextArea style={{height: height}} onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
);

const required = value => {
  return value ? undefined : <p> Required </p>;
};

const email = (value) => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? <p> Invalid Email </p>
    : undefined;
};

const linkedin = (value) => {
  return value && !value.toLowerCase().startsWith('https://www.linkedin.com')
    ? <p> Invalid Linkedin URL</p>
    : undefined;
};


class EditSpeaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_url: this.props.selectedSpeaker.avatar_url,
    };

    this.submit = this.submit.bind(this);
  }

  submit(speaker) {
    speaker.avatar_url = this.state.avatar_url;
    console.log('speaker form values: ', speaker);

    // need this line to populate the conference_id column in speakers
    speaker.conference_id = this.props.conference_id;

    let endpoint = !!this.props.initialValues.name ? 'api/editSpeaker' : 'api/speakers';

    let url = config.server.url + endpoint;
    axios.post(url, speaker)
      .then(response => {
        console.log('speaker updated: ', response);
        browserHistory.push('/Speakers');

      })
      .catch(err => {
        console.log('error updating speaker: ', err);
      });
  }

  getPicture(name, picture) {
    this.setState({
      avatar_url: picture
    });
  }

  render () {
    console.log('this.props in EditSpeaker: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
        <EventMenu currentPage="Speakers" />
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)', padding: 30}}>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
                <Form.Group>
                  <Field name="first_name" component={ renderTextField } validate={[required]} label="First Name" width={8}/>
                  <Field name="last_name" component={ renderTextField } validate={[required]} label="Last Name" width={8}/>
                </Form.Group>
                <Form.Group>
                  <Field name="email" component={ renderTextField } validate={[required, email]} label="Email" width={16}/>
                </Form.Group>
                <Form.Group>
                  <Field name="linkedin_id" component={ renderTextField } validate={[required]} label="LinkedIn Handle" width={16}/>
                </Form.Group>
                <Form.Group>
                  <Field name="job_title" component={ renderTextField } validate={[required]} label="Job Title" width={16}/>
                </Form.Group>
                <Form.Group>
                  <Field name="bio" component={ renderTextAreaField } validate={[required]} label="Speaker Bio" width={16} height={250} />
                </Form.Group>
                <Grid>
                  <Grid.Row >
                    <Grid.Column width={5} />
                    <Grid.Column width={5}>
                      <label style={{fontWeight: 'bold'}}>Speaker Avatar</label>
                      <UploadPicture picture={this.state.avatar_url || defaultImage} name="Speaker" getPicture={this.getPicture.bind(this)} />
                    </Grid.Column>
                    <Grid.Column width={5} />
                  </Grid.Row>
                </Grid>
                <Form.Group />
                <Button primary fluid type="submit" onClick={this.submit}>
                  {
                    !this.props.selectedSpeaker.first_name ? 'Add Speaker' : 'Update Speaker'
                  }
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const reduxFormConfig = {
  form: 'EditSpeaker',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
};

EditSpeaker = reduxForm(reduxFormConfig)(EditSpeaker);

EditSpeaker = connect(
  state => ({
    conference_id: state.conferenceReducer.selectedConference.id,
    selectedSpeaker: state.speakerReducer.selectedSpeaker,
    initialValues: state.speakerReducer.selectedSpeaker
  }))(EditSpeaker);

export default EditSpeaker;


