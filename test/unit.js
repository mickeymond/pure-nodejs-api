// Dependencies
const assert = require('assert');
const helpers = require('../src/helpers');

// Assert that the generateUuid is returning a string
it('helpers.generateUuid should return a string', done => {
  const uuid = helpers.generateUuid();
  assert.equal(typeof uuid, 'string');
  done();
});

// Assert that the generateUuid is returning a string of length 24
it('helpers.generateUuid should return a string of length 24', done => {
  const uuid = helpers.generateUuid();
  assert.equal(uuid.length, 24);
  done();
});