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

module.exports = router;