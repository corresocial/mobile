import { CitizenRegister } from '@domain/citizenRegister/model/entities/CitizenRegister'
import { CitizenRegisterEntity, CitizenRegisterLocation, } from '@domain/citizenRegister/model/entities/types'

const validLocation: CitizenRegisterLocation = {
	country: 'USA',
	state: 'NY',
	city: 'New York',
	district: 'Manhattan',
	street: '5th Avenue',
	postalCode: '10001',
	number: '789',
	coordinates: { latitude: 40.7128, longitude: -74.0060 },
	geohashNearby: ['dr5regw3j5']
}

const validProps: CitizenRegisterEntity = {
	citizenRegisterId: 'abc123',
	name: 'John Doe',
	cellNumber: '1234567890',
	censusTakerId: 'xyz789',
	createdAt: new Date('2023-06-19T00:00:00Z'),
	censusTakerName: 'Jane Smith',
	location: validLocation, // Exemplo de coordenadas
	responses: []
}

const validNewRegisterProps: CitizenRegisterEntity = {
	...validProps,
	citizenRegisterId: '', // Para simular um novo registro
}

describe('Entity CitizenRegister', () => {
	// Teste de criação de instância com valores válidos
	test('Deve criar uma instância válida de CitizenRegister', () => {
		const citizenRegister = new CitizenRegister(validProps)
		expect(citizenRegister.citizenRegisterId?.value).toBe(validProps.citizenRegisterId)
		expect(citizenRegister.name.value).toBe(validProps.name)
		expect(citizenRegister.cellNumber).toBe(validProps.cellNumber)
		expect(citizenRegister.censusTakerId.value).toBe(validProps.censusTakerId)
		expect(citizenRegister.createdAt).toEqual(validProps.createdAt)
		expect(citizenRegister.censusTakerName.value).toBe(validProps.censusTakerName)
		expect(citizenRegister.location).toEqual(validProps.location)
		expect(citizenRegister.responses).toEqual(validProps.responses)
	})

	// Teste de tratamento de novo registro (citizenRegisterId nulo)
	test('Deve configurar citizenRegisterId como nulo para novo registro', () => {
		const citizenRegister = new CitizenRegister(validNewRegisterProps, true)
		expect(citizenRegister.citizenRegisterId).toBeNull()
		expect(citizenRegister.createdAt).toBeInstanceOf(Date)
	})

	// Teste de método data
	test('Deve retornar os dados corretos no método data', () => {
		const citizenRegister = new CitizenRegister(validProps)
		expect(citizenRegister.data).toEqual(validProps)
	})

	// Teste de atributos obrigatórios
	test('Deve lançar erro se props obrigatórios faltarem', () => {
		expect(() => new CitizenRegister({ ...validProps, name: '' })).toThrow()
		expect(() => new CitizenRegister({ ...validProps, censusTakerId: '' })).toThrow()
		expect(() => new CitizenRegister({ ...validProps, censusTakerName: '' })).toThrow()
		// expect(() => new CitizenRegister({ ...validProps, responses: [] })).toThrow()
		// expect(() => new CitizenRegister({ ...validProps, location: null })).toThrow()
	})
})
