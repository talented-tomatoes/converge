const models = require('../../db/models/models.js');
const config = require('../../config/config.js');
const stripe = require('stripe')(config.stripe.secKey);

let getAllUsers = (req, res) => {
	console.log('GET /api/users');
	models.Users.fetch()
		.then(user => {
			console.log('users=', user.attributes);
			res.status(200).send(user);
		})
		//.then()
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
		res.status(200).send(collection)
	})
	.catch(err => {
		console.log('ERROR:', err);
		dz
	});
};

let getAllPresentationsOfConf = (req, res) => {
	const confid = req.params.confid;
	console.log('confid = ', confid);
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
	console.log('Inside checkinUser!');
	console.log('req = ', req);
	res.status(200).send('Success!');
};

let chargeCustomer = (req, res) => {

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
}

let registerUser = (req, res) => {
  console.log('Inside registerUser');
  console.log('req.body: ', req.body);
	models.User.forge(req.body).save()
		.then(user => {
			console.log('usr=', user);
		})
		.catch(err => {
			console.log('err=', err);
		})

  res.status(200).send('User saved!');
}

let createNewConference = (req, res) => {
  console.log('Inside createNewConference');
  console.log('req.body: ', req.body);
  console.log('req.body type: ', typeof req.body);

  models.Conference.forge(req.body).save()
    .then(conference => {
      console.log('conference saved: ', conference);
    })
    .catch(err => {
      console.log('error: ', err);
    })

  res.status(200).send('Conference saved!');
}

module.exports = {
	getAllUsers: getAllUsers,
	getAllSpeakersOfConf: getAllSpeakersOfConf,
	getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
	getAllConferences: getAllConferences,
	getAllPresentationsOfConf: getAllPresentationsOfConf,
	checkinUser: checkinUser,
	chargeCustomer: chargeCustomer,
  registerUser: registerUser,
  createNewConference: createNewConference,
};