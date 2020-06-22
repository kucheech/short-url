'use strict';

// const ApiBuilder = require('claudia-api-builder');
const { NULL_REQUEST, MISSING_PARAMETER, MISSING_OR_INVALID_VALUE } = require('../data/errorMessages');

const validateRequest = (request, requiredQueryParameters, requiredBodyParameters) => {
  if (!request) {
    return { error: NULL_REQUEST };
  }

  const validated = {};
  if (Array.isArray(requiredQueryParameters)) {
    if (!request.queryString) {
      return { error: MISSING_PARAMETER(requiredQueryParameters.map(p => p.name).join(', ')) };
    }

    for (let i = 0; i < requiredQueryParameters.length; i++) {
      const p = requiredQueryParameters[i];
      const v = request.queryString[p.name];
      if (isInvalidParameter(v, p.type)) {
        return { error: MISSING_OR_INVALID_VALUE(p.name) };
      }

      validated[p.name] = v;
    }
  }

  if (Array.isArray(requiredBodyParameters)) {
    const body = getRequestBody(request);
    if (Object.keys(body).length === 0) {
      return { error: MISSING_PARAMETER(requiredBodyParameters.map(p => p.name).join(', ')) };

    }

    for (let i = 0; i < requiredBodyParameters.length; i++) {
      const p = requiredBodyParameters[i];
      const v = body[p.name];
      if (isInvalidParameter(v, p.type)) {
        return { error: MISSING_OR_INVALID_VALUE(p.name) };
      }

      validated[p.name] = v;
    }
  }

  return validated;
}

const getRequestBody = request => {
  let body = (request || {}).body || '{}';
  if (typeof body === 'string') {
    body = JSON.parse(body);
  }
  return body;
}

const isInvalidParameter = (p, type) => {
  if (type === 'array') {
    return !Array.isArray(p);
  }

  if (typeof p !== type) {
    return true;
  }

  if (typeof p == 'string') {
    return p.length === 0;
  }

  return false;
};

module.exports = {
  validateRequest,
  isInvalidParameter,
  getRequestBody
};
