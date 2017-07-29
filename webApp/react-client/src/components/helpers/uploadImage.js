import config from '../../../../../config/config.js'
import sha1 from 'sha1';


module.exports = (image) => {
  let cloud_name = config.cloudinary.cloud_name;
  let api_secret = config.cloudinary.api_secret;
  let url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';

  let timestamp = Date.now();
  let tags = ['pic'];
  return {
    body: {
      file: image,
      api_key: config.cloudinary.api_key,
      timestamp: timestamp,
      tags: tags,
      signature: sha1("tags=" + tags + "&timestamp=" + timestamp + api_secret)
    },
    url: url
  };
}