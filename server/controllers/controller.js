const models = require('../../db/models/models.js');

let getHome = (req, res) => {
	console.log('GET /');
	res.status(200).send('success!');
};

let getAllUsers = (req, res) => {
	console.log('GET /api/users');
	res.status(200).send('success');
};

let getAllSpeakersOfConf = (req, res) => {

};

let getAllSpeakersOfPresentation = (req, res) => {

};

let getAllConferences = (req, res) => {

};

let getAllPresentationsOfConf = (req, res) => {

};

module.exports = {
	getHome: getHome,
	getAllUsers: getAllUsers,
	getAllSpeakersOfConf: getAllSpeakersOfConf,
	getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
	getAllConferences: getAllConferences,
	getAllPresentationsOfConf: getAllPresentationsOfConf
};