'use strict';

const shortid = require('shortid');
const ShortUrl = require('../models/ShortUrl');
const { validateRequest } = require('./util');
const { BASE_URL } = require('../data/constants');

const generateShortUrl = () => shortid.generate();

const createShortUrl = async request => {
  const { url: from, error } = await validateRequest(request, undefined, [{ name: 'url', type: 'string' }]);
  if (error) {
    return Promise.reject(error);
  }

  const new_shorturl = {
    from,
    Id: generateShortUrl()
  };

  return new Promise((resolve, reject) => {
    ShortUrl.create(new_shorturl, { overwrite: false }, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        const { Id } = shorturl.attrs;
        const sUrl = new URL(`/s/${Id}`, BASE_URL)
        resolve(sUrl.toString());
      } else {
        reject('Could not create shorturl');
      }
    });

  });
};

module.exports = createShortUrl;
