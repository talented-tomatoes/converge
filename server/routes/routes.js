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

router.route('/users/:userid/create')
  .post(controller.createConference);

router.route('/users/:userid/:confid/edit/map')
  .post(controller.editMap);

router.route('/users/:userid/:confid/edit/speakers')
  .post(controller.createSpeaker);

router.route('/users/:userid/:confid/edit/presentations')
  .post(controller.createPresentation);

/*********************PRESENTATIONS **********************/

router.route('/presentations/:confid')
  .get(controller.getAllPresentationsOfConf);


/*********************UPLOAD PIC **********************/
router.route('/users/:username/checkin')
  .post(controller.checkinUser);

/*********************PAYMENTS**********************/
router.route('/payments/charge')
  .post(controller.chargeCustomer);

/*********************REGISTRATION**********************/
router.route('/registerUser')
  .post(controller.registerUser);

/*********************JOINS**********************/
router.route('/join/conferences_users')
  .post(controller.saveUserToConference);

module.exports = router;