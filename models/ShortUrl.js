
'use strict';

const dynamo = require('dynamodb');
const Joi = require('joi');

dynamo.AWS.config.update({ region: 'ap-southeast-1' });
const tableName = 'ShortUrl';

const ShortUrl = dynamo.define(tableName, {
  hashKey: 'Id',

  timestamps: true,

  schema: {
    Id: Joi.string(), //slug
    from: Joi.string(), //long url
    expiredAt: Joi.number()
  },

  tableName
});

module.exports = ShortUrl;
