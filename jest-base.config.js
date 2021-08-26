module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: [],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  testPathIgnorePatterns: [
    'src/__tests__/mocks/',
    'dist',
    'src/__tests__/e2e/setupJest.ts'
  ],
  moduleNameMapper: {
    '^@app/common(.*)$': '<rootDir>/src/common$1',
    '^@app/data(.*)$': '<rootDir>/src/data$1',
    '^@app/server(.*)$': '<rootDir>/src/server$1',
    '^@app(.*)$': '<rootDir>/src$1'
  }
};
