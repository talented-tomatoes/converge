const models = require('../../db/models/models.js');
const config = require('../../config/config.js');
const stripe = require('stripe')(config.stripe.secKey);

let getAllUsers = (req, res) => {
	console.log('GET /api/users');
	models.Users.fetch()
		.then(users => {
			res.status(200).send(users);
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

};

let getAllPresentationsOfConf = (req, res) => {

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

module.exports = {
	getAllUsers: getAllUsers,
	getAllSpeakersOfConf: getAllSpeakersOfConf,
	getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
	getAllConferences: getAllConferences,
	getAllPresentationsOfConf: getAllPresentationsOfConf,
	checkinUser: checkinUser,
	chargeCustomer: chargeCustomer
};