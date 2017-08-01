'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Speakers API', function () {
//   beforeEach(function (done) {
//     dbUtils.rollbackMigrate(done);
//   });

//   // Resets database back to original settings
//   afterEach(function (done) {
//     dbUtils.rollback(done);
//   });

  it('accepts GET requests to /speakers/:confid', function (done) {
    request(app)
      .get('/api/speakers/1')
      .expect(res => {
          //console.log('/api/speakers--res===>', res.body);
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 4
      })
      .end(done);
  });

    it('accepts GET requests to /api/speakers/presentation/:presentationid', function (done) {
    request(app)
      .get('/api/speakers/presentation/1')
      .expect(res => {
        // console.log('/api/speakers/presentation/1---res===>', res.body[0]);
        res.body[0] = {
          id: res.body[0].id,
          first_name: !! (res.body[0].first_name),
          last_name: !! (res.body[0].last_name),
          avatar_url: !! (res.body[0].avatar_url),
          email: !! (res.body[0].email),
          linkedin_id: !! (res.body[0].linkedin_id),
          job_title: !! (res.body[0].job_title),
          bio: !! (res.body[0].bio),
          conference_id: !! (res.body[0].conference_id)
        };
      })
      .expect(200, [{
        id: 5,
        first_name: true,
        last_name: true,
        avatar_url: true,
        email: true,
        linkedin_id: true,
        job_title: true,
        bio: true,
        conference_id: true
      }])
      .end(done);
  });

it('accepts POST requests to /api/speakers', function (done) {
  let speaker = {
    first_name: 'testspeaker',
    last_name: 'lastname',
    job_title: 'testtitle',
    avatar_url: 'testurl',
    bio: 'test bio',
    email: 'test@gmail.com',
    linkedin_id: 'testhandle',
    conference_id: 1
  };
  request(app)
    .post('/api/speakers')
    .send(speaker)
    .expect(res => {
      res.body = {
        first_name: res.body.first_name,
        last_name: res.body.last_name,
        job_title: res.body.job_title,
        avatar_url: res.body.avatar_url,
        bio: res.body.bio,
        email: res.body.email,
        linkedin_id: res.body.linkedin_id,
        conference_id: res.body.conference_id
      };
    })
    .expect(201, speaker)
    .end(done);
  });
})