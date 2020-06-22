'use strict';

const ShortUrl = require('../models/ShortUrl');
const { validateRequest } = require('./util');

const generateShortUrl = url => {
  //TODO
  return url;
};

const createShortUrl = async request => {
  const { url: from, error } = await validateRequest(request, [{ name: 'url', type: 'string' }]);
  if (error) {
    return Promise.reject(error);
  }

  const new_shorturl = {
    from,
    Id: generateShortUrl(from)
  };

  return new Promise((resolve, reject) => {
    ShortUrl.create(new_shorturl, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        resolve(shorturl.attrs);
      } else {
        reject('Could not create shorturl');
      }
    });
  });
};

module.exports = createShortUrl;
