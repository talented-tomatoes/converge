
const CONFIG = require('../../config/config.js');

let getKairosRequestObj = (checkinpic_url, gallery_name, userid) => {
	const options = {
		url: CONFIG.kairos.KAIROS_URL,
		headers: {
			'Content-Type': 'application/json',
			'app_id': CONFIG.kairos.APP_ID,
			'app_key': CONFIG.kairos.APP_KEY
		},
		body: {
			'image': checkinpic_url,
			'gallery_name': gallery_name,
			'subject_id': userid
		}
	}
	return options;
};

module.exports = {
	getKairosRequestObj: getKairosRequestObj
};