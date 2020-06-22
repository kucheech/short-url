'use strict';

const MISSING_PARAMETER = p => `Missing parameter ${p}`;
const INVALID_VALUE = v => `Invalid ${v}`;
const MISSING_OR_INVALID_VALUE = v => `Missing or invalid ${v}`;
const NULL_REQUEST = 'Request should be not null';
const INTERNAL_APPLICATION_ERROR = 'Internal application error';
const NO_RESULT = 'No results found';
const NOT_FOUND = p => `${p} not found`;
const QUERY_LIMIT_EXCEEDED = 'Query capacity exceeded. Refine the parameters for a smaller query scope';

module.exports = {
  MISSING_PARAMETER,
  INVALID_VALUE,
  MISSING_OR_INVALID_VALUE,
  NULL_REQUEST,
  INTERNAL_APPLICATION_ERROR,
  NO_RESULT,
  NOT_FOUND,
  QUERY_LIMIT_EXCEEDED
}