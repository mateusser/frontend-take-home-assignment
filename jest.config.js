const moduleNameMapper = require('jest-module-name-mapper').default;

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/tsconfig.json'
    }
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(.s?css)$': '<rootDir>/spec/mock/cssMock.js',
    '\\.(svg)$': '<rootDir>/spec/mock/svgMock.js',
    '\\.(jpg|png)$': '<rootDir>/spec/empty-module.js',
    ...moduleNameMapper('tsconfig.json')
  },
  setupFilesAfterEnv: ['<rootDir>spec/setup.js'],
  moduleDirectories: ['node_modules', 'src']
};
