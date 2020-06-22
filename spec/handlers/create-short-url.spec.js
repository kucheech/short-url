'use strict';

const underTest = require('../../handlers/create-short-url');
const { MISSING_PARAMETER, MISSING_OR_INVALID_VALUE, NULL_REQUEST } = require('../../data/errorMessages');

describe('Create shorten url', () => {
  it(`should reject with a ${NULL_REQUEST} error for null request`, async () => {
    await expectAsync(underTest()).toBeRejectedWith(NULL_REQUEST);
  });

  const missing_or_invalid_url = MISSING_OR_INVALID_VALUE('url');
  it(`should reject with a ${missing_or_invalid_url} error for null request`, async () => {
    await expectAsync(underTest({ body: { url: 123 } })).toBeRejectedWith(missing_or_invalid_url);
    await expectAsync(underTest({ body: { url: true } })).toBeRejectedWith(missing_or_invalid_url);
    await expectAsync(underTest({ body: { url: {} } })).toBeRejectedWith(missing_or_invalid_url);
    await expectAsync(underTest({ body: { url: [] } })).toBeRejectedWith(missing_or_invalid_url);
    await expectAsync(underTest({ body: { url: '' } })).toBeRejectedWith(missing_or_invalid_url);
  });

  it('should resolve for valid request', async () => {
    const url = 'https://www.yahoo.com';
    await expectAsync(underTest({ body: { url } })).toBeResolved();
  });
});
