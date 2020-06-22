'use strict';

const ShortUrl = require('../models/ShortUrl');
const { validateRequest } = require('./util');

const getUrl = async request => {
  const { url: Id, error } = await validateRequest(request, [{ name: 'url', type: 'string' }]);
  if (error) {
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    ShortUrl.get(Id, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        resolve(shorturl.attrs.from);
      } else {
        reject('Could not find shorturl');
      }
    });
  });
};

module.exports = getUrl;
