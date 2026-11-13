export default {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/data/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/unit/**/*.test.js'],
  transform: {},
};
