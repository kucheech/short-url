'use strict';

const underTest = require('../../handlers/get-url');
const { MISSING_PARAMETER, MISSING_OR_INVALID_VALUE, NULL_REQUEST } = require('../../data/errorMessages');

describe('Get full url', () => {
  it(`should reject with a ${NULL_REQUEST} error for null request`, async () => {
    await expectAsync(underTest()).toBeRejectedWith(NULL_REQUEST);
  });

  // const missing_or_invalid_url = MISSING_OR_INVALID_VALUE('url');
  // it(`should reject with a ${missing_or_invalid_url} error for missing type`, async () => {
  //   await expectAsync(underTest({ queryString: {} })).toBeRejectedWith(missing_or_invalid_url);
  //   await expectAsync(underTest({ queryString: { type: 123 } })).toBeRejectedWith(missing_or_invalid_url);
  //   await expectAsync(underTest({ queryString: { type: true } })).toBeRejectedWith(missing_or_invalid_url);
  //   await expectAsync(underTest({ queryString: { type: [] } })).toBeRejectedWith(missing_or_invalid_url);
  //   await expectAsync(underTest({ queryString: { type: '' } })).toBeRejectedWith(missing_or_invalid_url);
  // });

  it('should resolve for valid request', async () => {
    const id = 'NZCJCEZSc';
    // const expected = 'https://www.yahoo.com';
    await expectAsync(underTest({ pathParams: { id } })).toBeResolved();
  });
});
