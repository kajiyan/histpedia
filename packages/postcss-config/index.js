const syntax = require('postcss-syntax');

exports.basePostCssConfig = {
  syntax,
  plugins: {
    'postcss-easings': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'all-property': true,
        'functional-color-notation': true,
        'custom-media-queries': true,
        'custom-properties': true,
        'media-query-ranges': true,
      },
    },
    'postcss-flexbugs-fixes': {},
    'postcss-sorting': {},
    'postcss-reporter': {
      clearReportedMessages: true,
    },
  },
};
