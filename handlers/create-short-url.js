'use strict';

const moment = require('moment');
const shortid = require('shortid');
const ShortUrl = require('../models/ShortUrl');
const { validateRequest } = require('./util');
const { BASE_URL, EXPIRY_HOURS } = require('../data/constants');

const generateShortUrl = () => shortid.generate();

const createShortUrl = async request => {
  const { url: from, error } = await validateRequest(request, undefined, [{ name: 'url', type: 'string' }]);
  if (error) {
    return Promise.reject(error);
  }

  const new_shorturl = {
    from,
    Id: generateShortUrl(),
    expiredAt: moment().add(EXPIRY_HOURS, 'hour').unix()
  };

  return new Promise((resolve, reject) => {
    ShortUrl.create(new_shorturl, { overwrite: false }, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        const { Id } = shorturl.attrs;
        const shortUrl = new URL(`/${Id}`, BASE_URL)
        resolve(shortUrl.toString());
      } else {
        reject('Could not create shorturl');
      }
    });

  });
};

module.exports = createShortUrl;
