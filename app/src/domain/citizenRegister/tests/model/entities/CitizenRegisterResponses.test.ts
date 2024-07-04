import { CitizenRegisterResponses } from '@domain/citizenRegister/model/domainServices/CitizenRegisterResponses'
import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

const mockResponses: CitizenRegisterQuestionResponse[] = [
	{
		questionId: 'q1',
		question: 'Qual é o seu nome?',
		questionType: 'textual',
		response: 'John Doe'
	},
	{
		questionId: 'q2',
		question: 'Quantos anos você tem?',
		questionType: 'numerical',
		response: 30
	},
	{
		questionId: 'q3',
		question: 'Você gosta de programar?',
		questionType: 'binary',
		response: true
	}
] as CitizenRegisterQuestionResponse[]

describe('CitizenRegisterResponses', () => {
	let responses: CitizenRegisterResponses

	beforeEach(() => {
		responses = new CitizenRegisterResponses(mockResponses)
	})

	test('mock', () => {
		expect(true).toBe(true)
	})

	// test('Deve adicionar uma nova resposta', () => {
	// 	const newResponse: CitizenRegisterQuestionResponse = {
	// 		questionId: 'q4',
	// 		question: 'Qual é a sua cor favorita?',
	// 		questionType: 'select',
	// 		response: 'Azul',
	// 		options: ['Vermelho', 'Verde', 'Azul']
	// 	}
	// 	const updatedResponses = responses.add(newResponse)

	// 	expect(updatedResponses.getByQuestionId('q4')).toBeDefined()
	// })

	// test('Deve atualizar uma resposta existente', () => {
	// 	const updatedResponse: CitizenRegisterQuestionResponse = {
	// 		questionId: 'q2',
	// 		question: 'Quantos anos você tem?',
	// 		questionType: 'numerical',
	// 		response: 25
	// 	}
	// 	const updatedResponses = responses.update(updatedResponse)

	// 	const retrievedResponse = updatedResponses.getByQuestionId('q2')
	// 	expect(retrievedResponse?.response).toBe(25)
	// })

	// test('Deve excluir uma resposta existente', () => {
	// 	const updatedResponses = responses.delete('q1')

	// 	const retrievedResponse = updatedResponses.getByQuestionId('q1')
	// 	expect(retrievedResponse).toBeUndefined()
	// })

	// test('Deve obter uma resposta pelo ID da pergunta', () => {
	// 	const retrievedResponse = responses.getByQuestionId('q3')
	// 	expect(retrievedResponse?.response).toBe(true)
	// })

	// test('Deve falhar na validação se uma resposta for inválida', () => {
	// 	const invalidResponse = {
	// 		questionId: 'q5',
	// 		question: 'Qual é o seu email?',
	// 		questionType: 'textual',
	// 		response: 123 // Response deve ser uma string, não um número
	// 	} as any
	// 	const updatedResponses = responses.add(invalidResponse)

	// 	const isValid = updatedResponses.questionResponses.length === 4
	// 	expect(isValid).toBe(false)
	// })

	// test('Deve falhar na validação se a pergunta estiver vazia', () => {
	// 	const emptyQuestionResponse = {
	// 		questionId: 'q6',
	// 		question: '',
	// 		questionType: 'textual',
	// 		response: 'Alguma resposta'
	// 	} as any
	// 	const updatedResponses = responses.add(emptyQuestionResponse)

	// 	const isValid = updatedResponses.validate()

	// 	expect(isValid).toBe(false)
	// })

	// test('Deve falhar na validação se uma resposta não estiver nas opções fornecidas (single-select)', () => {
	// 	const invalidOptionsResponse = {
	// 		questionId: 'q7',
	// 		question: 'Qual é a sua cor favorita?',
	// 		questionType: 'select',
	// 		response: 'Amarelo',
	// 		options: ['Vermelho', 'Verde', 'Azul']
	// 	}
	// 	const updatedResponses = responses.add(invalidOptionsResponse)

	// 	const isValid = updatedResponses.validate()

	// 	expect(isValid).toBe(false)
	// })

	// test('Deve falhar na validação se a resposta não for um array de strings para uma pergunta de seleção (multi-select)', () => {
	// 	const invalidMultiSelectResponse = {
	// 		questionId: 'q8',
	// 		question: 'Quais são suas cores favoritas?',
	// 		questionType: 'select',
	// 		response: 'Vermelho',
	// 		options: ['Vermelho', 'Verde', 'Azul'],
	// 		multiSelect: true
	// 	}
	// 	const updatedResponses = responses.add(invalidMultiSelectResponse)
	// 	const isValid = updatedResponses.validate()

	// 	expect(isValid).toBe(false)
	// })
})
