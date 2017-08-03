import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import config from '../../../../config/config.js';



import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import EditSpeakerInPresentation from './helpers/EditSpeakerInPresentation.jsx';
import DeleteSpeakerFromPresentation from './helpers/DeleteSpeakerFromPresentation.jsx';
import EventMenu from './EventMenu.jsx';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';




const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
);
const renderTextAreaField = ({input, label, placeholder, width, height, meta: { touched, error, warning }}) => (
  <Form.TextArea style={{height: height}} onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
);

const required = value => {
  return value ? undefined : <p> Required </p>;
};

class EditPresentation extends React.Component {
  constructor(props) {
    super(props);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.state = {
      selectedSpeakers: [],
      allSpeakers: [],
      yesterday,
      value: null
    };
  }

  resetState() {
    this.setState({ value: null });
  }


  submit(presentation) {
    console.log('presentation form values: ', presentation);
    let speakerIds = [].slice.call(presentation.selectedSpeakers);
    delete presentation.selectedSpeakers;
    let data = {
      presentation: presentation,
      speakerIds: speakerIds
    };

    let url = config.server.url + 'api/editPresentation';
    console.log('data: ', data);
    axios.post(url, data)
      .then(response => {
        console.log('presentation updated: ', response);
        browserHistory.push('/Presentations');
      })
      .catch(err => {
        console.log('error updating presentation: ', err);
      });
  }

  render () {
    console.log('this.props in EditPresentation: ', this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
        <EventMenu currentPage='Presentations' />
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)', padding: 30}}>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
                <Form.Group>
                  <Field name="name" component={ renderTextField } validate={[required]} label="Presentation Name" width={16}/>
                </Form.Group>
                <Form.Group>
                  {/* <Field name="date" component={ renderTextField } validate={[required]} label="Date" width={8}/>
                  <Field name="time" component={ renderTextField } validate={[required]} label="Time" width={8}/> */}
                  

                </Form.Group>
                <Form.Group>
                  <Field name="location" component={ renderTextField } validate={[required]} label="Location" width={16}/>
                </Form.Group>
                <Form.Group>
                  <Field name="description" component={ renderTextAreaField } validate={[required]} label="Presentation Description" width={16} height={250} />
                </Form.Group>
                <label style={{fontWeight: 'bold', fontSize: 13}}>Selected Speakers</label>
                <Form.Group>
                  <DeleteSpeakerFromPresentation />
                </Form.Group>
                <label style={{fontWeight: 'bold', fontSize: 13}}>Add A Speaker</label>
                <Form.Group>
                  <EditSpeakerInPresentation />
                </Form.Group>
                <Form.Group />
                <Form.Group />
                <Button primary fluid type="submit">
                  {
                    !this.props.selectedPresentation.name ? 'Add Presentation' : 'Update Presentation'
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
  form: 'EditPresentation',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
};

EditPresentation = reduxForm(reduxFormConfig)(EditPresentation);

EditPresentation = connect(
  state => ({
    selectedPresentation: state.presentationReducer.selectedPresentation,
    selectedConference: state.conferenceReducer.selectedConference,
    initialValues: state.presentationReducer.selectedPresentation
  }))(EditPresentation);

export default EditPresentation;
