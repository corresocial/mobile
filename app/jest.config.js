/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.js'],
	testMatch: ['**/*.test.ts'],
	collectCoverage: true, // Deixar true para visualizar % de cobertura de testes
	moduleNameMapper: {
		'^@/tests/(.*)$': '<rootDir>/tests/$1',
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@domain/(.*)$': '<rootDir>/src/domain/$1'
	},
	// coveragePathIgnorePatterns: ['./tests/data', './tests/mock'],
	testPathIgnorePatterns: ['/node_modules/']
}
