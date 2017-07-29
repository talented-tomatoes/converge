import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../../config/config.js';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';




const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
)
const renderTextAreaField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.TextArea onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
)

const required = value => {
  return value ? undefined  : <p> Required </p>
};

class EditPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  submit(presentation) {
    console.log('presentation form values: ', presentation);

    let url = config.server.url + 'api/editPresentation';
    axios.post(url, presentation)
      .then(response => {
        console.log('presentation updated: ', response);
        browserHistory.push('/Presentations');

      })
      .catch(err => {
        console.log('error updating presentation: ', error);
      })
  }

  render () {
    console.log('this.props in EditPresentation: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
          <h2>Presentation</h2>
          <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
            <Form.Group>
              <Field name="name" component={ renderTextField } validate={[required]} label="Presentation Name" width={16}/>
            </Form.Group>
            <Form.Group>
              <Field name="date" component={ renderTextField } validate={[required]} label="Date" width={8}/>
              <Field name="time" component={ renderTextField } validate={[required]} label="Time" width={8}/>
            </Form.Group>
            <Form.Group>
              <Field name="location" component={ renderTextField } validate={[required]} label="Location" width={16}/>
            </Form.Group>
            <Form.Group>
              <Field name="description" component={ renderTextAreaField } validate={[required]} label="Presentation Description" width={16}/>
            </Form.Group>
            <Form.Group />
            <Button primary type="submit">Update</Button>
          </Form>

      </div>
    )
  }
}

const reduxFormConfig = {
  form: 'EditPresentation',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
}

EditPresentation = reduxForm(reduxFormConfig)(EditPresentation)

EditPresentation = connect(
  state => ({
    selectedPresentation: state.presentationReducer.selectedPresentation,
    initialValues: state.presentationReducer.selectedPresentation
  }))(EditPresentation)

export default EditPresentation;
