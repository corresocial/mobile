import { CitizenRegisterResponse } from '@domain/citizenRegister/model/entities/CitizenRegisterResponse'
import { CitizenRegisterQuestionType, SatisfactionType, CitizenRegisterQuestionObservation, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'
import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'

describe('CitizenRegisterResponse', () => {
	const validId = 'q1'
	const validQuestion = 'Qual é o seu nome?'

	// Teste de criação com pergunta textual válida
	test('Deve criar uma resposta válida para uma pergunta textual', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: validQuestion,
			questionType: 'textual',
			response: 'John Doe',
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe(validQuestion)
		expect(response.questionType).toBe('textual')
		expect(response.response).toBe('John Doe')
	})

	// Teste de criação com pergunta numérica válida
	test('Deve criar uma resposta válida para uma pergunta numérica', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quantos anos você tem?',
			questionType: 'numerical',
			response: 30,
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe('Quantos anos você tem?')
		expect(response.questionType).toBe('numerical')
		expect(response.response).toBe(30)
	})

	// Teste de criação com pergunta binária válida
	test('Deve criar uma resposta válida para uma pergunta binária', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Você é maior de idade?',
			questionType: 'binary',
			response: true,
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe('Você é maior de idade?')
		expect(response.questionType).toBe('binary')
		expect(response.response).toBe(true)
	})

	// Teste de criação com pergunta de satisfação válida
	test('Deve criar uma resposta válida para uma pergunta de satisfação', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Como você se sente?',
			questionType: 'satisfaction',
			response: 4 as SatisfactionType,
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe('Como você se sente?')
		expect(response.questionType).toBe('satisfaction')
		expect(response.response).toBe(4)
	})

	// Teste de criação com pergunta de seleção válida (single-select)
	test('Deve criar uma resposta válida para uma pergunta de seleção (single-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Qual é a sua cor favorita?',
			questionType: 'select',
			response: ['Azul'],
			options: ['Vermelho', 'Verde', 'Azul'],
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe('Qual é a sua cor favorita?')
		expect(response.questionType).toBe('select')
		expect(response.response).toContain('Azul')
	})

	// Teste de criação com pergunta de seleção válida (multi-select)
	test('Deve criar uma resposta válida para uma pergunta de seleção (multi-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quais são suas cores favoritas?',
			questionType: 'select',
			response: ['Vermelho', 'Verde'],
			options: ['Vermelho', 'Verde', 'Azul'],
			multiSelect: true,
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(validId)
		expect(response.question).toBe('Quais são suas cores favoritas?')
		expect(response.questionType).toBe('select')
		expect(response.response).toEqual(['Vermelho', 'Verde'])
	})

	// Teste de criação com resposta inválida para pergunta textual
	test('Deve lançar um erro se a resposta não for uma string para uma pergunta textual', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: validQuestion,
			questionType: 'textual',
			response: 123 as unknown as string,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com resposta inválida para pergunta numérica
	test('Deve lançar um erro se a resposta não for um número para uma pergunta numérica', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quantos anos você tem?',
			questionType: 'numerical',
			response: 'trinta' as unknown as number,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com resposta inválida para pergunta binária
	test('Deve lançar um erro se a resposta não for um booleano para uma pergunta binária', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Você é maior de idade?',
			questionType: 'binary',
			response: 'sim' as unknown as boolean,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com resposta inválida para pergunta de satisfação
	test('Deve lançar um erro se a resposta não for uma satisfação válida', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Como você se sente?',
			questionType: 'satisfaction',
			response: 6 as unknown as SatisfactionType,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com resposta inválida para pergunta de seleção (single-select)
	test('Deve lançar um erro se a resposta não for uma string para uma pergunta de seleção (single-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Qual é a sua cor favorita?',
			questionType: 'select',
			response: 123 as unknown as string,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com resposta inválida para pergunta de seleção (multi-select)
	test('Deve lançar um erro se a resposta não for um array de strings para uma pergunta de seleção (multi-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quais são suas cores favoritas?',
			questionType: 'select',
			response: 'Vermelho' as unknown as string[],
			options: ['Vermelho', 'Verde', 'Azul'],
			multiSelect: true,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
	})

	// Teste de criação com pergunta vazia
	test('Deve lançar um erro se a pergunta estiver vazia', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: '',
			questionType: 'textual',
			response: 'Alguma resposta',
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.EMPTY_QUESTION)
	})

	// Teste de criação com um tipo de pergunta inválido
	test('Deve lançar um erro se o tipo de pergunta for inválido', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Pergunta inválida',
			questionType: 'unknown' as CitizenRegisterQuestionType,
			response: 'Resposta',
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.INVALID_QUESTION_TYPE)
	})

	// Teste de criação com opções inválidas para pergunta de seleção (single-select)
	test('Deve lançar um erro se a resposta não estiver nas opções fornecidas (single-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Qual é a sua cor favorita?',
			questionType: 'select',
			response: ['Amarelo'],
			options: ['Vermelho', 'Verde', 'Azul'],
			allowOtherOptions: false
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS)
	})

	// Teste de criação com opções inválidas para pergunta de seleção (multi-select)
	test('Deve lançar um erro se a resposta tiver opções fora das fornecidas (multi-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quais são suas cores favoritas?',
			questionType: 'select',
			response: ['Vermelho', 'Amarelo'],
			options: ['Vermelho', 'Verde', 'Azul'],
			multiSelect: true,
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS)
	})

	// Teste de criação com resposta específica faltando quando allowOtherOptions é true
	test('Deve lançar um erro se specificResponse estiver vazio quando allowOtherOptions for true', () => {
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: 'Quais são suas cores favoritas?',
			questionType: 'select',
			response: ['Vermelho', 'Verde'],
			options: ['Vermelho', 'Verde', 'Azul'],
			multiSelect: true,
			allowOtherOptions: true,
			specificResponse: '',
		}
		expect(() => new CitizenRegisterResponse(props)).toThrow(citizenRegisterErrors.MISSING_SPECIFIC_RESPONSE)
	})

	// Teste de criação com observações
	test('Deve criar uma resposta com observações', () => {
		const observations: CitizenRegisterQuestionObservation[] = [
			{ questionId: validId, message: 'Observação 1' },
			{ questionId: 'q2', message: 'Observação 2' },
		]
		const props: CitizenRegisterQuestionResponse = {
			questionId: validId,
			question: validQuestion,
			questionType: 'textual',
			response: 'John Doe',
			observations,
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.observations).toEqual(observations)
	})
})
