'use strict';

const underTest = require('../api');

describe('API', () => {
  [
    {
      path: '',
      requestTypes: ['GET']
    },
    {
      path: 'shorten',
      requestTypes: ['POST']
    },
    {
      path: '{id}',
      requestTypes: ['GET']
    }
  ].forEach(route => {
    it(`should setup /${route.path} route`, () => {
      expect(Object.keys(underTest.apiConfig().routes[route.path])).toEqual(route.requestTypes);
    })
  })
});
