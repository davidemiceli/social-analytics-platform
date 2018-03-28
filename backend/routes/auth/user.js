'use strict';

// Requirements
const config = require('../../config/config');

module.exports = function(req) {
  const user = req.pre.user;
  return user;
};
