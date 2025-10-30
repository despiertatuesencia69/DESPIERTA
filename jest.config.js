module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js', 'server.js'],
  testMatch: ['**/tests/**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  verbose: true,
};
