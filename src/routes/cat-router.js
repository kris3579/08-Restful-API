'use strict';

const Cat = require('../model/cat');
const router = require('../lib/router');
const logger = require('../lib/logger');

const catStorage = [];

const sendStatus = (code, message, response) => {
  logger.log(logger.INFO`Responding with ${code} code due to ${message}`);
  response.writeHead(code);
  response.end();
};

const sendJSON = (code, data, response) => {
  logger.log(logger.INFO, `Responding with ${code} code and following data`);
  logger.log(logger.INFO, JSON.stringify(data));
  response.end();
};

router.post('/api/cats', (request, response) => {
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with 400 code');
    sendStatus(400, 'body.title not found', response);
    return null;
  }

  if (!request.body.color) {
    logger.log(logger.INFO, 'Responding with 400 code');
    sendStatus(400, 'body.content not found', response);
    return null;
  }

  logger.log(logger.INFO, `name: ${request.body.name}, color: ${request.body.color}`);

  const cat = new Cat(request.body.name, request.body.color);
  catStorage.push(cat);
  sendJSON(200, cat, response);
  return null;
});

router.get('/api/cats', (request, response) => {
  if (!request.url.query.id) {
      logger.log(logger.INFO, 'here');
    logger.log(logger.INFO, 'Responding with 400 code!');
    sendStatus(400, 'body.id not found', response);
    return null;
  }
  for (let i = 0; i < catStorage.length; i++) {
    if (request.url.query.id === catStorage[i].id) {
      sendJSON(200, catStorage[i], response);
    }
  }
  return null;
});

// router.getAll('/api/all/cats', (request, response) => {
//
//   logger.log(logger.INFO, 'Responding with 200 code and following data');
//   return catStorage;
// });
