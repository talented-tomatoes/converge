import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import uploadImage from './helpers/uploadImage';
import axios from 'axios';
import request from 'superagent';
import config from '../../../../config/config.js'
import kairosEnrollReqObj from './helpers/kairosEnrollReqObj';
import normalizePhoneNumber from './helpers/normalizePhoneNumber';

import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';



const renderTextField = ({input, label, placeholder, width, meta: { touched, error, warning }}) => (
  <Form.Input onChange={e => input.onChange(e)} value={input.value} label={label} placeholder={placeholder} width={width} />
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

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      avatar_url: this.props.currentUser.avatar_url,
    }
  }

  handleDimmer() {
    this.setState({
      active: !this.state.active
    })
  }

  submit(profile) {
    console.log('profile: ', this.props);
    profile.login_id = this.props.currentUser.login_id;
    profile.avatar_url = this.state.avatar_url;
    profile.user_type = this.props.currentUser.user_type;
    console.log('profile form values: ', profile);

    let url = config.server.url + 'api/users';
    axios.post(url, profile)
      .then(response => {
        console.log('profile updated: ', response);
        browserHistory.goBack();
      })
      .catch(err => {
        console.log('error updating profile: ', err);
      })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    this.setState({avatar_url: 'https://media.giphy.com/media/210NUQw5BT8c0/giphy.gif'})
    let cloud_name = config.cloudinary.cloud_name;
    let url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';
    let upload = request.post('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload')
                        .field('upload_preset', 'converge')
                        .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
        this.setState({avatar_url: this.state.avatar_url})
      }
      if (response.body.secure_url !== '') {
        this.setState({
          avatar_url: response.body.secure_url
        });
      }
      let options = kairosEnrollReqObj(response.body.secure_url, this.props.currentUser.login_id, this.props.currentUser.login_id);
      axios.post(options.url, options.body, options.config)
      .then(response => {
        console.log('response: ', response);
      })
      .catch(err => {
        console.log('error uploading image to kairos=', err);
      })
    });

  }

  render () {
    console.log('this.props in editProfile: ', this.props);
    const { handleSubmit } = this.props;
    const { active } = this.state
    let dropzoneRef;
    const content = (
      <div>
        <Button animated onClick={(e) => { e.preventDefault(); dropzoneRef.open(); }}>
          <Button.Content visible>Upload</Button.Content>
          <Button.Content hidden>
            <Icon name='upload' />
          </Button.Content>
        </Button>
      </div>
    )
    return (
      <div>
          <h2>Edit Profile</h2>
          <Form onSubmit={handleSubmit(this.submit.bind(this)).bind(this) }>
            <Form.Group>
              <Field name="first_name" component={ renderTextField } validate={[required]} label="First Name" width={8}/>
              <Field name="last_name" component={ renderTextField } validate={[required]} label="Last Name" width={8}/>
            </Form.Group>
            <Form.Group>
              <Field name="email" component={ renderTextField } validate={[required, email]} label="Email" width={16}/>
            </Form.Group>
            <Form.Group>
              <Field name="linkedin_id" component={ renderTextField } validate={[required, linkedin]} label="LinkedIn Handle" width={16}/>
            </Form.Group>
            <Form.Group>
              <Field name="phone_number" component={ renderTextField } label="Phone Number" width={16} normalize={normalizePhoneNumber} />
            </Form.Group>
            <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
              <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleDimmer.bind(this)}
                onMouseLeave={this.handleDimmer.bind(this)}
                size='medium'
                src={this.state.avatar_url}
              />
              </Grid.Column>
              <Dropzone style={{display: 'none'}} accept="image/*" ref={(node) => { dropzoneRef = node; }} onDrop={this.onImageDrop.bind(this)}>
                <p>Drag picture here.</p>
              </Dropzone>
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
  form: 'EditProfile',
  fields: ['first_name', 'last_name', 'email', 'phone_number', 'linkedin_id'],
  // enableReinitialize : true
}

EditProfile = reduxForm(reduxFormConfig)(EditProfile)

EditProfile = connect(
  state => ({
    currentUser: state.userReducer.currentUser,
    initialValues: state.userReducer.currentUser
  }))(EditProfile)

export default EditProfile;
