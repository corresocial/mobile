import { CitizenRegister } from '@domain/citizenRegister/model/entities/CitizenRegister'
import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

describe('CitizenRegister', () => {
	const mockProps: CitizenRegisterEntity = {
		citizenRegisterId: '123',
		name: 'John Doe',
		cellNumber: '123456789',
		censusTakerId: 'census-taker-1',
		censusTakerName: 'Jane Doe',
		createdAt: new Date('2021-01-01T00:00:00Z'),
		location: { latitude: 0, longitude: 0 } as any,
		responses: [] as CitizenRegisterQuestionResponse[],
	}

	test('Deve criar uma nova instância de CitizenRegister sem id', () => {
		const citizenRegister = new CitizenRegister(mockProps, true)

		expect(citizenRegister.citizenRegisterId).toBeNull()
		expect(citizenRegister.name.value).toBe('John Doe')
		expect(citizenRegister.cellNumber).toBe('123456789')
		expect(citizenRegister.censusTakerId.value).toBe('census-taker-1')
		expect(citizenRegister.censusTakerName.value).toBe('Jane Doe')
		expect(citizenRegister.createdAt).toBeInstanceOf(Date)
		expect(citizenRegister.location).toEqual({ latitude: 0, longitude: 0 })
		expect(citizenRegister.responses).toEqual([])
	})

	test('Deve criar uma instância de CitizenRegister com id', () => {
		const citizenRegister = new CitizenRegister(mockProps, false)

		expect(citizenRegister.citizenRegisterId?.value).toBe('123')
		expect(citizenRegister.name.value).toBe('John Doe')
		expect(citizenRegister.cellNumber).toBe('123456789')
		expect(citizenRegister.censusTakerId.value).toBe('census-taker-1')
		expect(citizenRegister.censusTakerName.value).toBe('Jane Doe')
		expect(citizenRegister.createdAt).toEqual(new Date('2021-01-01T00:00:00Z'))
		expect(citizenRegister.location).toEqual({ latitude: 0, longitude: 0 })
		expect(citizenRegister.responses).toEqual([])
	})

	test('Deve retornar os dados corretos', () => {
		const citizenRegister = new CitizenRegister(mockProps, true)
		expect(citizenRegister.data).toEqual(mockProps)
	})

	test('Deve lançar um erro se as propriedades obrigatórias estiverem ausentes ou inválidas', () => {
		expect(() => new CitizenRegister({ ...mockProps, name: '' }, true)).toThrow()
	})
})
