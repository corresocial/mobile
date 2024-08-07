import { CitizenRegisterResponse } from '@domain/citizenRegister/model/entities/CitizenRegisterResponse'
import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'
import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'
import { sharedErrors } from '@domain/shared/constants/common/errorMessages'

const questionResponse: CitizenRegisterQuestionResponse = {
	questionId: 'Q12345',
	question: 'Qual é a sua faixa etária?',
	questionType: 'select',
	response: ['A'],
	optional: false,
	options: ['A', 'B', 'C', 'D', 'E'],
	multiSelect: false,
	allowOtherOptions: false,
	specificResponse: '',
	observations: [
		{
			questionId: 'Q12345',
			message: 'A resposta foi selecionada da lista de opções fornecidas.'
		}
	]
}

describe('CitizenRegisterResponse', () => {
	// GERAL
	test('Deve criar um registro válido com uma questão válida', () => {
		const props: CitizenRegisterQuestionResponse = { ...questionResponse }
		const response = new CitizenRegisterResponse(props)
		expect(response.questionId.value).toBe(questionResponse.questionId)
		expect(response.question).toBe(questionResponse.question)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve criar um registro válido e remover todos os campos strings opcionais vazios (specificResponse)', () => {
		const props: CitizenRegisterQuestionResponse = { ...questionResponse }
		const response = new CitizenRegisterResponse(props)
		expect(response.data().specificResponse).toBeUndefined()
	})

	test('Deve retornar um erro ao tentar criar uma resposta com a questão, id ou tipo de questão inválido', () => {
		const propsID1: CitizenRegisterQuestionResponse = { ...questionResponse, questionId: '' }
		const propsID2: CitizenRegisterQuestionResponse = { ...questionResponse, questionId: null as any }
		const propsQuestion1: CitizenRegisterQuestionResponse = { ...questionResponse, question: '' }
		const propsQuestion2: CitizenRegisterQuestionResponse = { ...questionResponse, question: null as any }
		const propsType1: CitizenRegisterQuestionResponse = { ...questionResponse, questionType: 'tipoInvalido' as any }
		const propsType2: CitizenRegisterQuestionResponse = { ...questionResponse, questionType: '' as any }
		expect(() => new CitizenRegisterResponse(propsID1)).toThrow(`${sharedErrors.EMPTY_ID}, ${sharedErrors.INVALID_ID}`)
		expect(() => new CitizenRegisterResponse(propsID2)).toThrow(`${sharedErrors.EMPTY_ID}, ${sharedErrors.INVALID_ID}`)
		expect(() => new CitizenRegisterResponse(propsQuestion1)).toThrow(citizenRegisterErrors.EMPTY_QUESTION)
		expect(() => new CitizenRegisterResponse(propsQuestion2)).toThrow(citizenRegisterErrors.EMPTY_QUESTION)
		expect(() => new CitizenRegisterResponse(propsType1)).toThrow(citizenRegisterErrors.INVALID_QUESTION_TYPE)
		expect(() => new CitizenRegisterResponse(propsType2)).toThrow(citizenRegisterErrors.INVALID_QUESTION_TYPE)
	})

	// TEXT Response

	test('Deve criar um registro válido para uma pergunta textual', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'textual',
			response: 'response'
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve criar um registro válido para uma pergunta textual com resposta vazia (resposta não obrigatório)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'textual',
			optional: true,
			response: ''
		}
		const response = new CitizenRegisterResponse(props, props.optional)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve lançar erro ao tentar cadastrar resposta textual vazia (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'textual',
			response: ''
		}
		try {
			const response = new CitizenRegisterResponse(props)
			expect(response).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}
	})

	// NUMERICAL Response

	test('Deve criar um registro válido para uma pergunta numérica', () => {
		const props1: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'numerical',
			response: '22'
		}
		const props2: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'numerical',
			response: 22
		}
		const response1 = new CitizenRegisterResponse(props1)
		expect(response1.questionType).toBe(props1.questionType)
		expect(response1.response).toBe(props1.response)
		const response2 = new CitizenRegisterResponse(props2)
		expect(response2.questionType).toBe(props2.questionType)
		expect(response2.response).toBe(props2.response)
	})

	test('Deve criar um registro válido para uma pergunta numérica com resposta vazia (resposta não obrigatório)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'numerical',
			optional: true,
			response: ''
		}
		const response = new CitizenRegisterResponse(props, props.optional)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve lançar erro ao tentar cadastrar resposta numérica vazia (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'numerical',
			optional: false,
			response: ''
		}
		try {
			const response = new CitizenRegisterResponse(props, props.optional)
			expect(response).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}
	})

	// SATISFACTION Response

	test('Deve criar um registro válido para uma pergunta de satisfação', () => {
		const props: CitizenRegisterQuestionResponse = { ...questionResponse, questionType: 'satisfaction' }

		const props1 = { ...props, response: '3' }
		const props2 = { ...props, response: 3 }
		const response1 = new CitizenRegisterResponse(props1)
		const response2 = new CitizenRegisterResponse(props2)
		expect(response1.questionType).toBe(props1.questionType)
		expect(response1.response).toBe(props1.response)
		expect(response2.questionType).toBe(props2.questionType)
		expect(response2.response).toBe(props2.response)
	})

	test('Deve criar um registro válido para uma pergunta de satisfação com resposta vazia (resposta não obrigatório)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'satisfaction',
			optional: true,
			response: ''
		}
		const response = new CitizenRegisterResponse(props, props.optional)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve lançar erro ao tentar cadastrar resposta de satisfação vazia ou inválida (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'satisfaction',
			optional: false
		}
		const props1 = { ...props, response: '' }
		const props2 = { ...props, response: null as any }

		try {
			const response1 = new CitizenRegisterResponse(props1, props1.optional)
			expect(!response1).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}

		try {
			const response2 = new CitizenRegisterResponse(props2, props2.optional)
			expect(!response2).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}
	})

	// BINARY Response

	test('Deve criar um registro válido para uma pergunta binária', () => {
		const props: CitizenRegisterQuestionResponse = { ...questionResponse, questionType: 'binary' }

		const props1 = { ...props, response: true }
		const props2 = { ...props, response: false }
		const response1 = new CitizenRegisterResponse(props1)
		const response2 = new CitizenRegisterResponse(props2)
		expect(response1.questionType).toBe(props1.questionType)
		expect(response1.response).toBe(props1.response)
		expect(response2.questionType).toBe(props2.questionType)
		expect(response2.response).toBe(props2.response)
	})

	test('Deve criar um registro válido para uma pergunta binária com resposta vazia (resposta não obrigatório)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'binary',
			optional: true,
			response: ''
		}
		const response = new CitizenRegisterResponse(props, props.optional)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve lançar erro ao tentar cadastrar resposta binária vazia ou inválida (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'binary',
			optional: false
		}
		const props1 = { ...props, response: '' }
		const props2 = { ...props, response: null as any }

		try {
			const response1 = new CitizenRegisterResponse(props1, props1.optional)
			expect(!response1).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}

		try {
			const response2 = new CitizenRegisterResponse(props2, props2.optional)
			expect(!response2).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}
	})

	// SELECT

	test('Deve retornar um erro ao informar uma questão multi-seleção com opções inválidas', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'select',
			optional: false
		}
		const props1 = { ...props, options: '' }
		const props2 = { ...props, options: [] as any }

		try {
			const response1 = new CitizenRegisterResponse(props1 as any, props1.optional)
			expect(!response1).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_QUESTION_OPTIONS)
		}

		try {
			const response2 = new CitizenRegisterResponse(props2, props2.optional)
			expect(!response2).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_QUESTION_OPTIONS)
		}
	})

	test('Deve criar um registro válido para uma pergunta seleção (single-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'select',
			multiSelect: false,
			response: ['A']
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve criar um registro válido para uma pergunta seleção (multi-select)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'select',
			multiSelect: true,
			response: ['A', 'B']
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve criar um registro válido para uma pergunta seleção (resposta não obrigatória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			optional: true,
			questionType: 'select',
			response: ''
		}
		const response = new CitizenRegisterResponse(props, props.optional)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve criar um registro válido para uma pergunta seleção com permissão para selecionar outras opções', () => {
		const props: CitizenRegisterQuestionResponse = { ...questionResponse, allowOtherOptions: true, questionType: 'select' }
		const props1 = { ...props, multiSelect: false, response: ['W'] }
		const props2 = { ...props, multiSelect: true, response: ['G', 'H'] }
		const response1 = new CitizenRegisterResponse(props1)
		const response2 = new CitizenRegisterResponse(props2)
		expect(response1.questionType).toBe(props1.questionType)
		expect(response2.response).toBe(props2.response)
		expect(response2.questionType).toBe(props2.questionType)
		expect(response2.response).toBe(props2.response)
	})

	test('Deve cadastrar resposta de select obrigatória quando houver o campo de resposta específica (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'select',
			allowOtherOptions: true,
			optional: false,
			specificResponse: 'resposta específica',
			response: []
		}
		const response = new CitizenRegisterResponse(props)
		expect(response.questionType).toBe(props.questionType)
		expect(response.response).toBe(props.response)
	})

	test('Deve lançar erro ao tentar cadastrar resposta de select vazia ou inválida (resposta obritagória)', () => {
		const props: CitizenRegisterQuestionResponse = {
			...questionResponse,
			questionType: 'select',
			optional: false
		}
		const props1 = { ...props, response: '' }
		const props2 = { ...props, response: [] }

		try {
			const response1 = new CitizenRegisterResponse(props1, props1.optional)
			expect(!response1).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}

		try {
			const response2 = new CitizenRegisterResponse(props2, props2.optional)
			expect(!response2).toBeUndefined()
		} catch (error: any) {
			expect(error.message).toContain(citizenRegisterErrors.INVALID_RESPONSE_TYPE)
		}
	})
})
