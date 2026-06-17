module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['react-app', 'react-app/jest', 'eslint:recommended'],
  rules: {
    'no-unused-vars': 'warn',
  },
};
