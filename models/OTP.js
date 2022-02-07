
'use strict';

const dynamo = require('dynamodb');
const Joi = require('joi');

dynamo.AWS.config.update({ region: 'ap-southeast-1' });
const tableName = 'OTP';

const OTP = dynamo.define(tableName, {
  hashKey: 'Id',

  timestamps: true,

  schema: {
    Id: Joi.string()
  },

  tableName
});

module.exports = OTP;
