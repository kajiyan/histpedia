exports.basePostCssConfig = {
  plugins: {
    'postcss-easings': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'all-property': true,
        'color-function': true,
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
