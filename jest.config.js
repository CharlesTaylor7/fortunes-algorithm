const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  roots: ['<rootDir>'],
  transform: {
    '\\.(t|j)sx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: ['node_modules/(!(flatqueue)/)'],
  setupFilesAfterEnv: [
    //"@testing-library/react/cleanup-after-each",
    '@testing-library/jest-dom/extend-expect',
    './jest.setup.ts',
  ],

  testRegex: '\\.test\\.[t|j]sx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
}
