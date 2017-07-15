const models = require('../../db/models/models.js');

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

module.exports = {
	getAllUsers: getAllUsers,
	getAllSpeakersOfConf: getAllSpeakersOfConf,
	getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
	getAllConferences: getAllConferences,
	getAllPresentationsOfConf: getAllPresentationsOfConf
};