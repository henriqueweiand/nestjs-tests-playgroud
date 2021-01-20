module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testTimeout: 20000,
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/interfaces/**',
    '!**/strategies/**',
    '!**/mock/**',
    '!**/migrations/**',
    '!**/migrations_history/**',
    '!**/migrations_master/**',
    '!**/enum/**',
    '!**/index.ts',
    '!**/server.ts',
    '!**/*.module.ts',
    '!**/*.entity.ts',
    '!**/*.dto.ts',
    '!envs.ts',
    '!<rootDir>/main.ts',
    '!<rootDir>/modules/address/address.controller.ts',
    '!<rootDir>/modules/common/**',
    '!<rootDir>/filters/**',
    '!<rootDir>/ormconfig.ts',
    '!<rootDir>/ormconfig_test.ts',
    '!<rootDir>/app.controller.ts',
    '!<rootDir>/app.service.ts',
    '!<rootDir>/modules/**/*.controller.ts',
    '!<rootDir>/interceptors/transform.interceptor.ts',
    '!<rootDir>/modules/auth/auth.service.ts',
    '!<rootDir>/modules/auth/jwt.guard.ts',
    '!<rootDir>/modules/auth/jwt.strategy.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '@google-cloud/pubsub':
      '<rootDir>/modules/common/__tests__/mock/pubSub.mock.ts',
  },
  preset: 'ts-jest',
};