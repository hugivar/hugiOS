const withImages = require('next-images');

module.exports = withImages({
  swcMinify: false,
  webpack(config, options) {
    console.log('next.config line:6', options.dev);
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
});

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
