/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'source-map';
    }

    config.module.rules.push({
      test: /posts.*\.md/,
      type: 'asset/source',
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = nextConfig;
