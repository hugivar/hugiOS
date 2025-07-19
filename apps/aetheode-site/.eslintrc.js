// module.exports = {
//   extends: [
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:@next/next/recommended',
//     'prettier'
//   ],
//   plugins: ['react', 'module-resolver', 'unused-imports'],
//   rules: {
//     'comma-dangle': ['error', 'never'],
//     'import/no-extraneous-dependencies': 0,
//     'import/prefer-default-export': 0,
//     'no-underscore-dangle': 0,
//     'no-useless-escape': 0,
//     'react/forbid-prop-types': 0,
//     'react/jsx-filename-extension': 0,
//     'react/jsx-props-no-spreading': 0,
//     'react/require-default-props': 0,
//     'func-names': 0
//   },
//   settings: {
//     react: {
//       version: 'detect'
//     }
//   }
// };

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'plugin:@next/next/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  'plugins': ['react'],
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-useless-escape': 0,
  },
  'settings': { 'react': { 'version': 'detect' } },
  'overrides': [
    {
      'files': ['**/*.ts', '**/*.tsx'],
      'env': { 'browser': true, 'es6': true, 'node': true },
      'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'ecmaFeatures': { 'jsx': true },
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json',
      },
      'plugins': ['react', '@typescript-eslint'],
      'rules': {
        'indent': ['error', 2, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-explicit-any': 0,
      },
      'settings': { 'react': { 'version': 'detect' } },
    },
  ],
};

