import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon, Menu } from 'semantic-ui-react';
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
)
const renderTextAreaField = ({input, label, placeholder, width, height, meta: { touched, error, warning }}) => (
  <Form.TextArea style={{height: height}} onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
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

class EditConference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      logo: this.props.selectedConference.logo,
      banner: this.props.selectedConference.banner,
      venue_map: this.props.selectedConference.venue_map,
      activeItem: 'Add Conference'
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
        browserHistory.push('/MyEvents');
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

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log('click works');
    this.setState({
      activeItem: name
    })
    if (name === 'My Events') {
      browserHistory.push('/MyEvents');
    } else if (name === 'AddConference') {
      this.props.dispatch(setSelectedConference({}));
      browserHistory.push('/EditConference');
    }
  }

  render () {
    console.log('this.props in EditConference: ', this.props);
    const { handleSubmit } = this.props;
    const { activeItem } = this.state;
    return (
      <div>
        {
          this.props.selectedConference.name ? (
            <EventMenu currentPage='Details'/>
          ) : (
            <Menu tabular widths="6" inverted style={{backgroundColor: '#428bca'}}>
              <Menu.Item style={this.state.activeItem === 'My Events' ? styles.tabSelected : {color: 'white'}} name='My Events' active={activeItem === 'My Events'} onClick={this.handleItemClick.bind(this)} />
              <Menu.Item style={this.state.activeItem === 'Add Conference' ? styles.tabSelected : {color: 'white'}} name='Add Conference' active={activeItem === 'Add Conference'} onClick={this.handleItemClick.bind(this)} />
            </Menu>
          )
        }
        <Grid style={{backgroundColor: 'rgb(200, 199, 204)', padding: 30}}>
          <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
              <Form.Group>
                <Field name="name" component={ renderTextField } validate={[required]} label="Conference Name" width={16}/>
              </Form.Group>
              <Form.Group>
                <Field name="address" component={ renderTextField } validate={[required]} label="Address" width={16}/>
              </Form.Group>
              <Form.Group>
                <Field name="ticket_price" component={ renderTextField } validate={[required]} label="Ticket Price" width={16}/>
              </Form.Group>
              <Form.Group>
                <Field name="details" component={ renderTextAreaField } validate={[required]} label="Conference Blurb" width={16} height={250}/>
              </Form.Group>
              <Grid>
                <Grid.Row >
                  <Grid.Column width={5}>
                    <label style={{fontWeight: 'bold'}}>Logo</label>
                    <UploadPicture picture={this.state.logo || defaultImage} name="Logo" getPicture={this.getPicture.bind(this)} />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <label style={{fontWeight: 'bold'}}>Banner</label>
                    <UploadPicture picture={this.state.banner || defaultImage} name="Banner" getPicture={this.getPicture.bind(this)} />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <label style={{fontWeight: 'bold'}}>Venue Map</label>
                    <UploadPicture picture={this.state.venue_map || defaultImage} name="Venue Map" getPicture={this.getPicture.bind(this)} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Form.Group />
              <Button primary fluid type="submit">
              {
                !this.props.selectedConference.name ? 'Add Conference' : 'Update Conference'
              }
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={3} />
          </Grid.Row>
        </Grid>

      </div>
    )
  }
}

const reduxFormConfig = {
  form: 'EditConference',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
}

EditConference = reduxForm(reduxFormConfig)(EditConference)

EditConference = connect(
  state => ({
    selectedConference: state.conferenceReducer.selectedConference,
    initialValues: state.conferenceReducer.selectedConference
  }))(EditConference)

export default EditConference;

const styles = {
  tabSelected: {
    backgroundColor: 'rgb(200, 199, 204)',
  }
}
