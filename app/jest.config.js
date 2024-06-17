/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.js'],
	testMatch: ['**/test/**/*.test.ts'],
	collectCoverage: true, // Deixar true para visualizar % de cobertura de testes
	moduleNameMapper: {
		'^@/test/(.*)$': '<rootDir>/test/$1',
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@domain/(.*)$': '<rootDir>/src/domain/$1'
	},
	coveragePathIgnorePatterns: ['./test/data', './test/mock'],
	testPathIgnorePatterns: ['/node_modules/', './test/mock']
}
