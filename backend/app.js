'use strict';

// Requirements
const Inert = require('inert');
const server = require('./server');
const routes = require('./routes');

// Initialize app
const init = async () => {
  // Add static file and directory handlers plugin
  await server.register({plugin: Inert});
  // Use routes
  server.route(routes);
  // Start server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// Start app
init();
