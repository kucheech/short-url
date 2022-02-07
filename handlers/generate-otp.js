'use strict';

// const shortid = require('shortid');
const ApiBuilder = require('claudia-api-builder');
const OTP = require('../models/OTP');
// const { validateRequest } = require('./util');
// const { INVALID_VALUE } = require('../data/errorMessages');

const getOTP = () => {
  return Math.floor(Math.random() * 1000000)
}

const generateOTP0 = async request => {

  // return Promise.resolve(getOTP())
  // const { id: Id } = request.pathParams;

  // if (!Id || !shortid.isValid(Id)) {
  //   return Promise.reject(INVALID_VALUE('sid'));
  // }

  return new Promise((resolve, reject) => {
    const otp = {
      Id: '' + getOTP()
    }

    OTP.create(otp, { overwrite: false }, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        // const { Id } = shorturl.attrs;
        // const sUrl = new URL(`/${Id}`, BASE_URL)
        resolve(otp.Id);
      } else {
        reject('Could not create shorturl');
      }
    });

  });


  // return new Promise((resolve, reject) => {
  //   ShortUrl.get(Id, (err, shorturl) => {
  //     if (err) {
  //       reject(err);
  //     }

  //     if (shorturl) {
  //       const { from: url } = shorturl.attrs;
  //       resolve(new ApiBuilder.ApiResponse(url, undefined, 302));
  //     } else {
  //       reject('Could not find shorturl');
  //     }
  //   });
  // });
};

module.exports = generateOTP0;
