'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.route('/')
  .get(controller.getHome);

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

module.exports = router;