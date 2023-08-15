/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['react-native'],
  },
}
