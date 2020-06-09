const path = require('path');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  // URLの末尾に「/」が必要な場合はtrueに変更
  exportTrailingSlash: true,
  env: {
    rootPath: '/',
  },
  webpack: (config) => {
    /* eslint-disable no-param-reassign */
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, './src'),
    };

    config.module.rules.push(
      /*
       * 下記の警告が表示されるのでコメント
       * .css ファイルを読み込むのは _app.tsx 内の ress だけになる見込み
       * Warning: Built-in CSS support is being disabled due to custom CSS configuration being detected.
       */
      // {
      //   test: /\.(css)$/,
      //   exclude: /node_modules/,
      //   use: [{ loader: 'postcss-loader' }],
      // },
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'postcss-loader' }],
      }
    );
    /* eslint-enable no-param-reassign */

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
