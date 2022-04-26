module.exports = (api) => {
  api.cache(true);
  return {
    compact: false,
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      ['@babel/preset-env', { modules: 'commonjs' }],
    ],
    plugins: [],
    env: {
      production: {
        compact: true,
      },
    },
  };
};
