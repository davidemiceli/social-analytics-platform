'use strict';

// App configurations
const config = {
  port: 3000,
  host: 'localhost',
  jwt: {
    secret: '<a long secret key string>',
    expire: '2h'
  },
  paths: {
      services: '/api',
      dashboard: '/dashboard'
  }
};

module.exports = config;
