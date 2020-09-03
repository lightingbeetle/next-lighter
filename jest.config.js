module.exports = {
  projects: [
    {
      displayName: 'integration',
      testMatch: ['**/*.test.js'],
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
      },
      rootDir: 'test/integration',
      testEnvironment: '<rootDir>/integrationEnvironment.js',
    },
  ],
};
