'use strict'

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

//handlers
const createShortUrl = require('./handlers/create-short-url');
const getUrl = require('./handlers/get-url');
const generateOTP = require('./handlers/generate-otp');
const verifyOTP = require('./handlers/verify-otp');

api.get('/', () => 'Welcome to URL shortening API');
// api.post('/shorten', request => createShortUrl(request));
// api.get('/{id}', async request => getUrl(request));
api.get('/otp/generate', async request => generateOTP(request));
api.get('/otp/verify/{otp}', async request => verifyOTP(request));

module.exports = api;
