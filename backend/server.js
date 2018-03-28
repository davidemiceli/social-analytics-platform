'use strict';

// Requirements
const Path = require('path');
const Hapi = require('hapi');
const config = require('./config/config');

const server = Hapi.server({
  port: config.port,
  host: config.host,
  debug: {
    request: ['error']
  }
});

module.exports = server;
