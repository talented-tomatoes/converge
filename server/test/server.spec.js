
'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');

describe('basic server', function() {
  it('sends back hello world', function(done) {
    request(app)
      .get('/api/helloWorld')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal('hello world');
      })
      .end(done);
  });
});