'use strict';

// Requirements
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const moment = require('moment');
const config = require('../../config/config');

module.exports = function(req) {
  // Mock user
  const user = {
    id: '12345',
    email: 'testuser@gmail.com',
    password: req.payload.password,
    name: 'Test',
    surname: 'User'
  };
  // Check if email and password are correct
  if (req.payload.email !== user.email && req.payload.password !== user.password) {
    return Boom.unauthorized('Wrong email or password');
  }
  // Create JWT Token
  const to_encode = Object.assign({randomkey: Math.random()}, user);
  const token = jwt.sign(to_encode, config.jwt.secret, {
    algorithm: 'HS256',
    expiresIn: config.jwt.expire
  });
  console.log('token =>', token);
  return {token: token};
};
