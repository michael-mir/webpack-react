const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const joinPath = (...url) => path.join(appDirectory, ...url);

module.exports = {
  join: joinPath,
  src: joinPath('src'),
  build: joinPath('dist'),
  public: joinPath('public'),
  html: joinPath('src', 'index.html'),
  index: joinPath('src', 'index.tsx')
};
