'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

/*********************USERS **********************/
router.route('/users')
  .get(controller.getAllUsers);


/*********************SPEAKERS **********************/
router.route('/speakers/:confid')
  .get(controller.getAllSpeakersOfConf);

  // presentations_speakers table
router.route('/speakers/:presentationid')
  .get(controller.getAllSpeakersOfPresentation);


/*********************CONFERENCES **********************/
router.route('/conferences')
  .get(controller.getAllConferences);

router.route('/addConference') 
  .post(controller.addConference);

router.route('/getConferencesByHostID/:hostID')
  .get(controller.getConferencesByHostID);

router.route('/addSpeaker')
  .post(controller.addSpeaker);

// router.route('/users/edit/presentations')
//   .post(controller.createPresentation);

/*********************PRESENTATIONS **********************/

router.route('/presentations/:confid')
  .get(controller.getAllPresentationsOfConf);


/*********************UPLOAD PIC **********************/
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

module.exports = router;