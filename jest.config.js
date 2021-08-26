const config = require('./jest-base.config.js');

module.exports = {
  ...config,
  testMatch: [
    'src/**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};
