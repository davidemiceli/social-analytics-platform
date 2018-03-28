'use strict';

// Requirements
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const config = require('../config/config');

// USE RESTIFY (see below)
// https://stackoverflow.com/questions/19281654/serving-static-files-with-restify
// http://restify.com/docs/home
module.exports = function(req, h) {
  // Get token
  const token = req.headers.authorization ? req.headers.authorization.replace(/^Bearer /, '') : null;
  if (!token) {
    return Boom.unauthorized('Missing authorization');
  }
  // Try to decode token
  const decoded = jwt.verify(token, config.jwt.secret, {
    algorithm: 'HS256',
    maxAge: config.jwt.expire
  });
  // Check if decoding is correct
  if (!decoded) {
    return Boom.unauthorized('Invalid authorization');
  }
  // Check here if the user is valid
  const user = {
    id: '12345',
    name: 'Test',
    surname: 'User'
  };
  // Pass user to the next handler
  req.pre.user = user;
  return h.continue;
};
