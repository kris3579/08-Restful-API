'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require('../routes/cat-router');

const app = http.createServer(router.findAndExecuteRoutes);

const server = module.exports = {};

server.start = (port = 3000) => {
  return app.listen(port, () => {
    logger.log(logger.INFO, `Server up on PORT: ${port}`);
  });
};

// server.stop = (port, callback) => {
//   logger.log(logger.INFO, `Server on PORT: ${port} stopped`);
// };
