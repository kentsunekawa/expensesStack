/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['react-native'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
