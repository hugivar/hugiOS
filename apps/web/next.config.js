/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom"
  },
  devIndicators: {
    autoPrerender: false,
  },
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
