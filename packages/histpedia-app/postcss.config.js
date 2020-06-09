const path = require('path');
const { basePostCssConfig } = require('@kajiyan/postcss-config');

basePostCssConfig.plugins.stylelint = {
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
};

module.exports = basePostCssConfig;
