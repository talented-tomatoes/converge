import Config from '../../../../../config/config.js';

module.exports = (img_url, subject_id, gallery_name) => {
  const options = {
    url: Config.kairos.KAIROS_URL + '/enroll',
    config : {
      headers: {
      'Content-Type': 'application/json',
      'app_id': Config.kairos.APP_ID,
      'app_key': Config.kairos.APP_KEY
      }
    },
    body: {
      'image': img_url,
      'gallery_name': gallery_name,
      'subject_id': subject_id
    }
  }
  return options;
};
