'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.route('/')
  .get((req,res) => {console.log('route works');res.send('test');})

/*********************USERS **********************/
router.route('/users')
  .get(controller.getAllUsers);

router.route('/users/:userid')
  .get(controller.getUser);

router.route('/editUserProfile')
  .post(controller.editUserProfile);


/*********************SPEAKERS **********************/
router.route('/speakers/:confid')
  .get(controller.getAllSpeakersOfConf);

  // presentations_speakers table
router.route('/speakers/presentation/:presentationid')
  .get(controller.getAllSpeakersOfPresentation);

// modify speakers from a conference
router.route('/editSpeaker')
  .post(controller.updateSpeakerOfConf);

router.route('/speakers/:speakerid/:presentationid')
  .delete(controller.deleteSpeakerFromPresentation);


/*********************CONFERENCES **********************/
router.route('/conferences')
  .get(controller.getAllConferences);

router.route('/conference/:confID')
  .get(controller.getConferenceByConfID);

router.route('/helloWorld')
  .get(controller.helloWorld);

router.route('/addConference')
  .post(controller.addConference);

router.route('/editConference')
  .post(controller.editConference);

router.route('/getConferencesByHostID/:hostID')
  .get(controller.getConferencesByHostID);

router.route('/addSpeaker')
  .post(controller.addSpeaker);



/*********************PRESENTATIONS **********************/

router.route('/presentations/:confid')
  .get(controller.getAllPresentationsOfConf);

router.route('/presentations/:presid')
  .delete(controller.removePresentationFromConference)

router.route('/addPresentation')
  .post(controller.addPresentation);

router.route('/editPresentation')
  .post(controller.editPresentation);

/*********************KAIROS CHECKIN **********************/
router.route('/users/:userid/checkin')
  .post(controller.checkinUser);

/*********************PAYMENTS**********************/
router.route('/payments/charge')
  .post(controller.chargeCustomer);

/*********************REGISTRATION**********************/
router.route('/registerUser')
  .post(controller.registerUser);

router.route('/getUserID/:userID')
  .get(controller.getUserIdByGoogleLoginID);

/*********************JOINS**********************/
router.route('/join/conferences_users')
  .post(controller.saveUserToConference);

router.route('/join/conferences_users/:userid')
  .get(controller.getAllUserEvents);

router.route('/join/users_presentations/:userid')
  .get(controller.getUserSchedule);

router.route('/join/users_presentations')
  .post(controller.savePresentationToUserSchedule);

router.route('/join/users_presentations/:userid/:presid')
  .delete(controller.removePresentationFromUserSchedule);

router.route('/join/presentations_speakers/:speakerid')
  .get(controller.getAllPresentationsOfSpeaker);

module.exports = router;