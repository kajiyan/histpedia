const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  // 環境変数 process.env.{keyName} で参照できる
  env: {
    rootPath: '/',
  },
  // URLの末尾に「/」が必要な場合はtrueに変更
  exportTrailingSlash: true,
  exportPathMap: async () => {
    const paths = {
      '/': { page: '/' },
    };

    return paths;
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    minimize: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
  poweredByHeader: false,
  webpack: (config) => {
    const customConfig = {
      ...config,
    };

    customConfig.resolve.alias = {
      ...customConfig.resolve.alias,
      '~': path.resolve(__dirname, './src'),
    };

    customConfig.module.rules.push(
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          // inline: true,
          name: 'static/[hash].worker.js',
          publicPath: '/_next/',
        },
      },
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

    // Overcome webpack referencing `window` in chunks
    customConfig.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

    return customConfig;
  },
};

module.exports = withPlugins([withBundleAnalyzer, withImages], nextConfig);
