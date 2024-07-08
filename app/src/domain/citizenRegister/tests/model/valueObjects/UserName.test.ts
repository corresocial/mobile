import { UserName } from '@domain/citizenRegister/model/valueObjects/UserName'
import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'

describe('ValueObject de UserName.ts', () => {
	// Teste de criação com nome válido sem exigir formalidade
	test('Deve criar um nome válido sem exigir formalidade', () => {
		const validName = 'John'
		const userName = new UserName(validName)
		expect(userName.value).toBe(validName)
		expect(userName.requireFormalName).toBe(false)
	})

	// Teste de criação com nome válido exigindo formalidade
	test('Deve criar um nome válido exigindo formalidade', () => {
		const validFormalName = 'John Doe'
		const userName = new UserName(validFormalName, true)
		expect(userName.value).toBe(validFormalName)
		expect(userName.requireFormalName).toBe(true)
	})

	// Teste de nome vazio
	test('Deve lançar um erro se o nome estiver vazio', () => {
		expect(() => new UserName('')).toThrow(citizenRegisterErrors.EMPTY_NAME)
	})

	// Teste de nome com menos de 3 caracteres
	test('Deve lançar um erro se o nome tiver menos de 3 caracteres', () => {
		expect(() => new UserName('Jo')).toThrow(citizenRegisterErrors.SMALL_NAME)
	})

	// Teste de nome com mais de 50 caracteres
	test('Deve lançar um erro se o nome tiver mais de 50 caracteres', () => {
		const longName = 'John Jacob Jingleheimer Schmidt This Name Is Very Long'
		expect(() => new UserName(longName)).toThrow(citizenRegisterErrors.LARGE_NAME)
	})

	// Teste de nome sem sobrenome quando formalidade é exigida
	test('Deve lançar um erro se o nome não tiver sobrenome e formalidade for exigida', () => {
		expect(() => new UserName('John', true)).toThrow(citizenRegisterErrors.SINGLE_NAME)
	})

	// Teste de nome com caracteres inválidos quando formalidade é exigida
	test('Deve lançar um erro se o nome contiver caracteres inválidos e formalidade for exigida', () => {
		expect(() => new UserName('John D@e', true)).toThrow(citizenRegisterErrors.NAME_INVALID_CHARACTERS)
	})

	// Teste de primeiro nome
	test('Deve retornar o primeiro nome', () => {
		const userName = new UserName('John Doe')
		expect(userName.firstName).toBe('John')
	})

	// Teste de último nome
	test('Deve retornar o último nome', () => {
		const userName = new UserName('John Doe')
		expect(userName.lastName).toBe('Doe')
	})

	// Teste de criação sem exigir formalidade mas com nome completo
	test('Deve criar um nome completo sem exigir formalidade', () => {
		const completeName = 'John Doe'
		const userName = new UserName(completeName, false)
		expect(userName.value).toBe(completeName)
		expect(userName.requireFormalName).toBe(false)
	})

	// Teste de criação com nome sem espaços, com exigência de formalidade falsa
	test('Deve criar um nome sem espaços se formalidade não for exigida', () => {
		const singleName = 'John'
		const userName = new UserName(singleName, false)
		expect(userName.value).toBe(singleName)
		expect(userName.requireFormalName).toBe(false)
	})

	// Teste de criação com nome contendo caracteres válidos quando formalidade é exigida
	test('Deve criar um nome contendo caracteres válidos quando formalidade é exigida', () => {
		const validNameWithCharacters = 'John O\'Reilly Jr.'
		const userName = new UserName(validNameWithCharacters, true)
		expect(userName.value).toBe(validNameWithCharacters)
	})
})
