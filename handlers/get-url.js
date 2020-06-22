'use strict';

const shortid = require('shortid');
const ApiBuilder = require('claudia-api-builder');
const ShortUrl = require('../models/ShortUrl');
// const { validateRequest } = require('./util');
const { INVALID_VALUE } = require('../data/errorMessages');

const getUrl = async request => {
  const { id: Id } = request.pathParams;

  if (!Id || !shortid.isValid(Id)) {
    return Promise.reject(INVALID_VALUE('sid'));
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
        reject('Could not find shorturl');
      }
    });
  });
};

module.exports = getUrl;
