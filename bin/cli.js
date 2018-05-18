#!/usr/bin/env node

const path = require('path');
const buildFile = require('../lib/build-file');
const program = require('commander');

const programName = path.basename(process.argv[1]);
const description =
 `Transform all HTML elements containing a graph description and whose class
  name starts with <prefix> to SVG elements using Viz.js.`;
const help =
`
  Example:

    $ ${programName} --quiet "language-viz-" input.html output.html
`;

program
  .version('0.0.1')
  .arguments('<prefix> <input> <output>')
  .option('-q, --quiet', 'render silently')
  .description(description)
  .on('--help', () => {
    console.log(help);
  })
  .action((prefix, input, output, options) => {
     prefixValue = prefix;
     inputValue = input;
     outputValue = output;
     quietValue = options.quiet;
  })
  .parse(process.argv);

if (typeof prefixValue === 'undefined') {
  program.help();
}
if (typeof quietValue === 'undefined') {
  quietValue = false;
}

buildFile(prefixValue, inputValue, outputValue, quietValue);
