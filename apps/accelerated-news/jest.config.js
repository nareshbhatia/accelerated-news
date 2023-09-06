module.exports = {
  preset: 'jest-config-custom',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/test/jest.setup.ts'],
};
