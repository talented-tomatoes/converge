import Config from '../../../../../config/config.js';

module.exports = (img_url, gallery_name, subject_id) => {
	const options = {
		url: CONFIG.kairos.KAIROS_URL + '/enroll',
		headers: {
			'Content-Type': 'application/json',
			'app_id': CONFIG.kairos.APP_ID,
			'app_key': CONFIG.kairos.APP_KEY
		},
		body: {
			'image': img_url,
			'gallery_name': gallery_name,
			'subject_id': userid
		}
	}
	return options;
};
