'use strict';
// Routes mapping

// Requirements
const config = require('./config/config');

// Middlewares
const isAuth = require('./middlewares/isauth');

// Index page
const home = (req, h) => h.file('./index.html');
const health = (req) => {status: 'ok'};

// Routes
const routes = [
  // Pages and redirect
  {method: 'GET', path: '/', handler: home},
  {method: 'GET', path: config.paths.dashboard, handler: home},
  {method: 'GET', path: `${config.paths.dashboard}/{path*}`, handler: home},
  // APIs Services
  {method: 'GET', path: `${config.paths.services}/health`, handler: health},
  {method: 'POST', path: `${config.paths.services}/auth/signin`, handler: require('./routes/auth/signin')},
  {method: 'GET', path: `${config.paths.services}/auth/user`, handler: require('./routes/auth/user'), config: {pre: [isAuth]}},
  {method: 'GET', path: `${config.paths.services}/auth/logout`, handler: require('./routes/auth/logout'), config: {pre: [isAuth]}},
  // Static folders
  {method: 'GET', path: '/build/{path*}', handler: {directory: {path: '../build'}}},
  {method: 'GET', path: '/bower_components/{path*}', handler: {directory: {path: '../bower_components'}}},
  {method: 'GET', path: '/{path*}', handler: {directory: {path: '../public'}}}
];

// Exporting endpoints
module.exports = routes;
