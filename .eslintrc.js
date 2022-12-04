module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'object-curly-spacing': 0,
    'comma-dangle': 0,
    'max-len': 0,
  },
  parserOptions: {
    sourceType: 'module',
  },
};
