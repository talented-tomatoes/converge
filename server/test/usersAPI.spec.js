'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

// describe('Users API', function () {
//   beforeEach(function (done) {
//     dbUtils.rollbackMigrate(done);
//   });

//   // Resets database back to original settings
//   afterEach(function (done) {
//     dbUtils.rollback(done);
//   });

  it('accepts GET requests to /api/users', function (done) {
    request(app)
      .get('/api/users')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 4
      })
      .end(done);
  });

  it('accepts GET requests to /api/users/:userid', function (done) {
    request(app)
      .get('/api/users/106873821099349941383')
      .expect(res => {
        res.body = {
          id: res.body.id,
          first_name: !! (res.body.first_name),
          last_name: !! (res.body.last_name),
          avatar_url: !! (res.body.avatar_url),
          email: !! (res.body.email),
          linkedin_id: !! (res.body.linkedin_id),
          phone_number: !! (res.body.phone_number),
          user_type: !! (res.body.user_type)
        };
      })
      .expect(200, {
        id: 1,
        first_name: true,
        last_name: true,
        avatar_url: true,
        email: true,
        linkedin_id: true,
        phone_number: true,
        user_type: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/users/:id does not exist', function (done) {
    request(app)
      .get('/api/users/123')
      .expect(404)
      .end(done);
  });

  it('accepts PUT requests to /api/users', function () {
    let user = {
      login_id: '106873821099349941383',
      email: 'testemail2',
      linkedin_id: 'testhandle2',
    };

    return request(app)
      .put('/api/users')
      .send(user)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/users/106873821099349941383')
          .expect(res => {
            res.body = {
              login_id: res.body.login_id,
              email: res.body.email,
              linkedin_id: res.body.linkedin_id
            };
          })
          .expect(200, user);
      });
  });
