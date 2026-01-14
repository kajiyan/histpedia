const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,  // Phase 7でESLint更新後に削除
  },
  typescript: {
    ignoreBuildErrors: true,  // 型互換性問題を解決後に削除
  },
  env: {
    rootPath: '/',
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, './src'),
    };

    return config;
  },
};

// Bundle analyzer is only loaded when ANALYZE=true (development only)
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
