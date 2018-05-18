const fs = require("fs");
const util = require('util');
const path = require('path');
const deasync = require('deasync');

// Convert fs.readFile, fs.readdir, fs.stat into Promise version.
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);


async function getData(dirname) {
  var data = {};
  const files = await readdir(dirname);
  for (const index in files) {
    const file = files[index];
    const infos = await stat(`${dirname}/${file}`);
    if (infos.isDirectory()) {
      data[file] = {};
      const subfiles = await readdir(`${dirname}/${file}`);
      for (const index in subfiles) {
        const subfile = subfiles[index];
        const _content = await readFile(`${dirname}/${file}/${subfile}`);
        const content = `${_content}`;
        const filename = path.basename(subfile, '.html');
        data[file][filename] = content;
      }
    }
  }
  return data;
}

function getDataSync(dirname) {
    var inflight = true;
    var ret;
    getData(dirname).then((result) => {
      ret = result;
      inflight = false;
    });
    deasync.loopWhile(() => inflight);
    return ret;
}

module.exports = {
  getData: getData,
  getDataSync: getDataSync
};
