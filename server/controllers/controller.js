const models = require('../../db/models/models.js');
const config = require('../../config/config.js');
const stripe = require('stripe')(config.stripe.secKey);
const util = require('../lib/utils.js');
const axios = require('axios');

let getAllUsers = (req, res) => {

	console.log('GET /api/users');
	models.Users.fetch()
		.then(user => {
			console.log('users=', user.attributes);
			res.status(200).send(user);
		})
		.catch(err => {
			console.log('Error:', err);
			res.status(500).send(err);
		})

};

let getAllSpeakersOfConf = (req, res) => {
  const confid = req.params.confid;
  models.Speaker.where({confid: confid})
    .fetchAll()
    .then((trips) => {
      console.log('\tSUCCESS\n');
      res.status(200).json(trips);
    })
  .catch((err) => {
    console.log('ERROR GETting Trips collection: ', err);
    res.status(404).send(err);
  });
};

let getAllSpeakersOfPresentation = (req, res) => {
  const confid = req.params.confid;
  models.Speaker.where({confid: confid})
    .fetchAll()
    .then((trips) => {
      console.log('\tSUCCESS\n');
      res.status(200).json(trips);
    })
  .catch((err) => {
    console.log('ERROR GETting Trips collection: ', err);
    res.status(404).send(err);
  });
};

let getAllConferences = (req, res) => {
  models.Conferences.fetch()
  .then(collection => {
    console.log('conferences = ', collection);
    res.status(200).send(collection);
  })
  .catch(err => {
    console.log('ERROR:', err);
    dz;
  });
};

let getAllPresentationsOfConf = (req, res) => {
  const confid = req.params.confid;
  // console.log('confid = ', confid);
  // models.Presentation.forge({conferenceid:confid})
  // 	.fetch({withRelated: ['conferences']})
  // 	.then(presentations => {
  // 		console.log('presentations = ', presentations);
  // 		res.status(200).send(collection)
  // 	})
  // 	.catch(err => {
  // 		console.log('Error!', err);
  // 	})
};

let checkinUser = (req, res) => {

	//console.log('req.userid = ', req.params.userid);
	//console.log('req.body======>', req.body);
	let USERID = req.params.userid;
	let CHECKINPICURL = req.body.checkinpicurl;
	//console.log('CHECKINPICURL=====>', CHECKINPICURL);
	let gallery_name = '';
	models.User.where({loginid:USERID}).fetch({columns:['gallery_name']})
	.then(user => {
		if (!user) {
			console.log('user=', user);
			res.status(200).send('No User');
		} else {
			gallery_name = user.attributes.gallery_name;
			console.log('GALLERY_NAME=', gallery_name);
			// verify
			const OPTIONS = util.getKairosRequestObj(CHECKINPICURL, gallery_name, USERID);
			console.log('options = ', OPTIONS);
			return axios.post(OPTIONS.url, OPTIONS.body, OPTIONS.config);
	};
		//res.status(200).send('Success!');
	})
	.then(response => {
		console.log('response from kairos ====>', response.data);
		let confidence = response.data.images[0]['transaction']['confidence'];
		console.log('confidence=', confidence);
		if (confidence > 0.75) {
			res.status(200).send('Success');
		} else {
			res.status(200).send('Checkin Failed. Please enter a Valid Picture');
		}
	})
	.catch(err => {
		console.log('ERROR getting avatar_url for user with userid:', err);
	})
	};



let chargeCustomer = (req, res) => {

  console.log('Inside chargeCustomer POST ===> ', req.body);

  stripe.charges.create({
    amount: Number(req.body.details.total.amount.value) * 100,
    currency: 'usd',
    description: 'Example event registration charge',
    source: req.body.token
  }, function(err, charge) {
    if (err) {
      console.log(err);
    }
    console.log(charge);
  });

  res.status(201).end();
};

let registerUser = (req, res) => {
  console.log('Inside registerUser');
  console.log('req.body: ', req.body);
  models.User.forge(req.body).save()
    .then(user => {
      console.log('usr=', user);
    })
    .catch(err => {
      console.log('err=', err);
    });

  res.status(200).send('User saved!');
};

let getUserIdByGoogleLoginID = (req, res) => {
  console.log('req.params: ', req.params.userID);
  models.User.where({'loginid': req.params.userID}).fetch()
    .then(user => {
      res.status(200).send(user);
    });

}



let saveUserToConference = (req, res) => {
  console.log('Payment successful. Saving user to Conference ===>', req.body);
  var conferenceid = req.body.conference_id;
  var userid = req.body.user_id;
  models.ConferenceUser.forge({conferenceid, userid})
    .fetch()
    .then(record => {
      if (record) {
        console.log('RECORD FOUND ===>', record);
        res.status(201).end();
      } else {
        models.ConferenceUser.forge({conferenceid, userid}).save();
        res.status(201).end();
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).end();
    });
};

let addConference = (req, res) => {
  console.log('Inside addConference');
  console.log('req.body: ', req.body);
  console.log('req.body type: ', typeof req.body);

  models.Conference.forge(req.body).save()
    .then(conference => {
      console.log('conference saved: ', conference);
    })
    .catch(err => {
      console.log('error: ', err);
    });

  res.status(200).send('Conference saved!');
};

let getConferencesByHostID = (req, res) => {
  console.log('req.params.hostID: ', req.params.hostID);
  
  models.Conference.where({user_id: req.params.hostID}).fetchAll()
    .then(conferences => {
      console.log('conferences: ', conferences);
      res.status(200).send(conferences);
    })
}


let addSpeaker = (req, res) => {
  models.Speaker.forge(req.body).save()
    .then(speaker => {
      console.log('speaker saved: ', speaker);
    })
    .catch(err => {
      console.log('error: ', err);
    });

  res.status(200).send('Speaker saved!');
};
// let addPresentation = (req, res) => {};


module.exports = {
  getAllUsers: getAllUsers,
  getAllSpeakersOfConf: getAllSpeakersOfConf,
  getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
  getAllConferences: getAllConferences,
  getAllPresentationsOfConf: getAllPresentationsOfConf,
  checkinUser: checkinUser,
  chargeCustomer: chargeCustomer,
  registerUser: registerUser,
  addConference: addConference,
  addSpeaker: addSpeaker,
  // addPresentation: addPresentation,
  saveUserToConference: saveUserToConference,
  getUserIdByGoogleLoginID: getUserIdByGoogleLoginID,
  getConferencesByHostID: getConferencesByHostID
};
