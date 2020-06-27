'use strict';

const ApiBuilder = require('claudia-api-builder');
const ShortUrl = require('../models/ShortUrl');
// const { validateRequest } = require('./util');
const { INVALID_VALUE, COULD_NOT_FIND_SLUG } = require('../data/errorMessages');

const getUrl = async request => {
  const { id: Id } = request.pathParams;

  if (!Id) {
    return Promise.reject(INVALID_VALUE('id'));
  }

  return new Promise((resolve, reject) => {
    ShortUrl.get(Id, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        const { from: url } = shorturl.attrs;
        resolve(new ApiBuilder.ApiResponse(url, undefined, 302));
      } else {
        reject(COULD_NOT_FIND_SLUG);
      }
    });
  });
};

module.exports = getUrl;
