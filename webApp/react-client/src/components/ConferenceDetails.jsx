import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import uploadImage from './helpers/uploadImage';
import axios from 'axios';
import request from 'superagent';
import config from '../../../../config/config.js';
import kairosEnrollReqObj from './helpers/kairosEnrollReqObj';
import normalizePhoneNumber from './helpers/normalizePhoneNumber';

import UploadPicture from './helpers/UploadPicture.jsx';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';


const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
)
const renderTextAreaField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.TextArea onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
)

const required = value => {
  return value ? undefined  : <p> Required </p>
};

const email = (value) => {
 return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
              ? <p> Invalid Email </p>
              : undefined
}

const linkedin = (value) => {
  return value && !value.toLowerCase().startsWith('https://www.linkedin.com')
               ? <p> Invalid Linkedin URL</p>
              : undefined
}


class ConferenceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      logo: this.props.selectedConference.logo,
      banner: this.props.selectedConference.banner,
      venue_map: this.props.selectedConference.venue_map,
    }
  }

  submit(conference) {
    console.log('conference: ', conference);
    conference.logo = this.state.logo;
    conference.banner = this.state.banner;
    conference.venue_map = this.state.venue_map;
    console.log('conference form values: ', conference);

    let url = config.server.url + 'api/editConference';
    axios.post(url, conference)
      .then(response => {
        console.log('conference updated: ', response);
      })
      .catch(err => {
        console.log('error updating conference: ', error);
      })
  }

  getPicture(name, picture) {
    console.log('name: ', name);
    console.log('picture: ', picture);
    if (name === 'Logo') {
      this.setState({
        logo: picture
      })
    } else if (name === 'Banner') {
      this.setState({
        banner: picture
      })
    } else if (name === 'Venue Map') {
      this.setState({
        venue_map: picture
      })
    }
  }

  render () {
    console.log('this.props in ConferenceDetails: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
          <h2>Conference Details</h2>
          <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
            <Form.Group>
              <Field name="name" component={ renderTextField } validate={[required]} label="Conference Name" width={8}/>
            </Form.Group>
            <Form.Group>
              <Field name="address" component={ renderTextField } validate={[required]} label="Address" width={8}/>
            </Form.Group>
            <Form.Group>
              <Field name="ticket_price" component={ renderTextField } validate={[required]} label="Ticket Price" width={4}/>
            </Form.Group>
            <Form.Group>
              <Field name="details" component={ renderTextAreaField } validate={[required]} label="Conference Blurb" width={16} height={200}/>
            </Form.Group>
            <Grid>
              <Grid.Row >
                <Grid.Column width={5}>
                  <label style={{fontWeight: 'bold'}}>Logo</label>
                  <UploadPicture picture={this.state.logo} name="Logo" getPicture={this.getPicture.bind(this)} />
                </Grid.Column>
                <Grid.Column width={5}>
                  <label style={{fontWeight: 'bold'}}>Banner</label>
                  <UploadPicture picture={this.state.banner} name="Banner" getPicture={this.getPicture.bind(this)} />
                </Grid.Column>
                <Grid.Column width={5}>
                  <label style={{fontWeight: 'bold'}}>Venue Map</label>
                  <UploadPicture picture={this.state.venue_map} name="Venue Map" getPicture={this.getPicture.bind(this)} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Form.Group />
            <Button primary type="submit">Update</Button>
          </Form>

      </div>
    )
  }
}

const reduxFormConfig = {
  form: 'ConferenceDetails',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
}

ConferenceDetails = reduxForm(reduxFormConfig)(ConferenceDetails)

ConferenceDetails = connect(
  state => ({
    selectedConference: state.conferenceReducer.selectedConference,
    initialValues: state.conferenceReducer.selectedConference
  }))(ConferenceDetails)

export default ConferenceDetails;
