import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Image, Grid, Dimmer, Header, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import uploadImage from './uploadImage';
import axios from 'axios';
import request from 'superagent';
import config from '../../../../config/config.js';


export default class UploadPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      picture: this.props.picture
    }
  }

  handleDimmer() {
    this.setState({
      active: !this.state.active
    })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    this.setState({picture: 'https://media.giphy.com/media/210NUQw5BT8c0/giphy.gif'})
    let cloud_name = config.cloudinary.cloud_name;
    let url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';
    let upload = request.post('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload')
                        .field('upload_preset', 'converge')
                        .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
        this.setState({picture: this.state.picture})
      }
      if (response.body.secure_url !== '') {
        this.setState({
          picture: response.body.secure_url
        });
        this.props.getPicture(this.props.name, this.state.picture)
      }
    });

  }

  render() {
    const { active } = this.state;
    let dropzoneRef;
    const content = (
      <div>
        <Button animated onClick={(e) => { e.preventDefault(); dropzoneRef.open(); }}>
          <Button.Content visible>Upload {this.props.name}</Button.Content>
          <Button.Content hidden>
            <Icon name='upload' />
          </Button.Content>
        </Button>
      </div>
    )
    return (
      <div style={{padding: 7}}>
        <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleDimmer.bind(this)}
          onMouseLeave={this.handleDimmer.bind(this)}
          size='medium'
          src={this.state.picture}
        />
        <Dropzone style={{display: 'none'}} accept="image/*" ref={(node) => { dropzoneRef = node; }} onDrop={this.onImageDrop.bind(this)}>
                  <p>Drag picture here.</p>
        </Dropzone>
      </div>
    )
  }
}