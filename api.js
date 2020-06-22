'use strict'

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

//handlers
const createShortUrl = require('./handlers/create-short-url');
const getUrl = require('./handlers/get-url');

api.get('/', () => 'Welcome to URL shortening API');
api.post('/shorten', request => createShortUrl(request));
api.get('/{id}', async request => getUrl(request));

module.exports = api;
