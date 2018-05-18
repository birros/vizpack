const fs = require('fs');
const util = require('util');
const buildString = require('./build-string');

// Convert fs.readFile & fs.writeFile into Promise version.
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function buildFile(prefix, inputFile, outputFile, quiet = false) {
  try {
    if (!quiet) {
      console.log(`Prefix chosen: ${prefix}`);
      console.log(`Rendering from ${inputFile}`);
    }
    const data = await readFile(inputFile, 'utf8');
    const result = await buildString(prefix, data);
    await writeFile(outputFile, result);
    if (!quiet) {
      console.log(`Rendering saved in ${outputFile}`);
    }
  } catch (err) {
    console.log(`${err}`);
  }
}

module.exports = buildFile;
