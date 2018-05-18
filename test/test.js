const expect = require('chai').expect;
const buildString = require('../lib/build-string');
const { getDataSync } = require('./data');

const prefix = 'language-viz-';
const data = getDataSync(`${__dirname}/data`);

describe('buildString', () => {
  it('is a function', () => {
    expect(buildString).to.be.a('function');
  });

  for (const item in data) {
    it(`test data: ${item}`, async () => {
      const output = await buildString(prefix, data[item].input, true);

      expect(output).to.equal(data[item].output);
    });
  }
});
