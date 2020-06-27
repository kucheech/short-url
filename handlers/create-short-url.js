'use strict';

const moment = require('moment');
const { nanoid } = require('nanoid');
const ShortUrl = require('../models/ShortUrl');
const { validateRequest } = require('./util');
const { BASE_URL, EXPIRY_HOURS, NUM_CHARS } = require('../data/constants');

const generateId = () => nanoid(NUM_CHARS);

const createShortUrl = async request => {
  const { url: from, error } = await validateRequest(request, undefined, [{ name: 'url', type: 'string' }]);
  if (error) {
    return Promise.reject(error);
  }

  const new_shorturl = {
    from,
    Id: generateId(),
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
