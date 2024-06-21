import { Id } from '@domain/shared/valueObjects/Id'

import { sharedErrors } from '../constants/common/errorMessages'

describe('ValueObject Id.ts', () => {
	test('Deve criar um objeto Id com um ID válido', () => {
		const validId = 'abc123'
		const id = new Id(validId)
		expect(id.value).toBe(validId)
	})

	test('Deve lançar um erro se o ID estiver vazio', () => {
		expect(() => new Id('')).toThrow(sharedErrors.INVALID_ID)
	})

	test('Deve retornar verdadeiro para IDs iguais', () => {
		const id1 = new Id('abc123')
		const id2 = new Id('abc123')
		expect(id1.isEqual(id2)).toBe(true)
	})

	test('Deve retornar falso para IDs diferentes', () => {
		const id1 = new Id('abc123')
		const id2 = new Id('xyz789')
		expect(id1.isEqual(id2)).toBe(false)
	})

	test('Deve retornar verdadeiro para IDs diferentes', () => {
		const id1 = new Id('abc123')
		const id2 = new Id('xyz789')
		expect(id1.isDifferent(id2)).toBe(true)
	})

	test('Deve retornar falso para IDs iguais', () => {
		const id1 = new Id('abc123')
		const id2 = new Id('abc123')
		expect(id1.isDifferent(id2)).toBe(false)
	})
})
