import { UserName } from '@domain/citizenRegister/model/valueObjects/UserName'
import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'

describe('Value Object de UserName.ts', () => {
	test('Deve lançar um erro ao tentar criar nome vazio', () => {
		expect(() => new UserName('')).toThrow(citizenRegisterErrors.EMPTY_NAME)
	})

	test('Deve lançar um erro ao tentar criar nome com menos de 3 caracteres', () => {
		expect(() => new UserName('12')).toThrow(citizenRegisterErrors.SMALL_NAME)
	})

	test('Deve lançar um erro ao tentar criar nome com mais de 20 caracteres', () => {
		const largeName = 'Deve lançar um erro ao tentar criar nome muito grande Deve lançar um erro ao tentar criar nome muito grande Deve lançar um erro ao tentar criar nome muito grande Deve lançar um erro ao tentar criar nome muito grande Deve lançar um erro ao tentar criar nome muito grande'
		expect(() => new UserName(largeName)).toThrow(citizenRegisterErrors.LARGE_NAME)
	})

	test('Deve lançar um erro ao tentar criar nome undefined', () => {
		expect(() => new UserName()).toThrow(citizenRegisterErrors.EMPTY_NAME)
	})

	// test('Deve lançar um erro ao tentar criar nome sem sobrenome', () => {
	// 	expect(() => new UserName('Wellington')).toThrow(citizenRegisterErrors.SINGLE_NAME)
	// })

	// test('Deve lançar um erro ao tentar criar nome com caracteres especiais', () => {
	// 	expect(() => new UserName('Wellingt@n souza')).toThrow(citizenRegisterErrors.NAME_INVALID_CHARACTERS)
	// })

	test('Deve criar nome completo com sobrenomes', () => {
		const userName = new UserName('Wellington Souza Abreu')

		expect(userName.value).toBe('Wellington Souza Abreu')
		expect(userName.firstName).toBe('Wellington')
		expect(userName.lastName).toBe('Abreu')
	})
})
