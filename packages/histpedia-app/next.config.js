const path = require('path');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  // URLの末尾に「/」が必要な場合はtrueに変更
  exportTrailingSlash: true,
  env: {
    rootPath: '/',
  },
  webpack: (config) => ({
    ...config,
    resolve: {
      alias: {
        ...config.resolve.alias,
        // '~': path.resolve(__dirname, 'packages/histpedia-app'),
      },
    },
  }),
};

module.exports = withPlugins(
  [],
  nextConfig,
);
