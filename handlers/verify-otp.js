'use strict';

// const shortid = require('shortid');
const ApiBuilder = require('claudia-api-builder');
const OTP = require('../models/OTP');
// const { validateRequest } = require('./util');
// const { INVALID_VALUE } = require('../data/errorMessages');



const verifyOTP = async request => {

  const { otp: Id } = request.pathParams;

  // if (!Id || !shortid.isValid(Id)) {
  //   return Promise.reject(INVALID_VALUE('sid'));
  // }

  // return new Promise((resolve, reject) => {
  //   const otp = {
  //     Id: '' + getOTP()
  //   }

  //   OTP.create(otp, { overwrite: false }, (err, shorturl) => {
  //     if (err) {
  //       reject(err);
  //     }

  //     if (shorturl) {
  //       // const { Id } = shorturl.attrs;
  //       // const sUrl = new URL(`/${Id}`, BASE_URL)
  //       resolve(otp.Id);
  //     } else {
  //       reject('Could not create shorturl');
  //     }
  //   });

  // });


  return new Promise((resolve, reject) => {
    OTP.get(Id, (err, shorturl) => {
      if (err) {
        reject(err);
      }

      if (shorturl) {
        // const { from: url } = shorturl.attrs;
        resolve('verified');
      } else {
        reject('Could not find OTP');
      }
    });
  });
};

module.exports = verifyOTP;
