import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'
import { Converter } from '@domain/shared/utils/Converter'
import { Validator } from '@domain/shared/utils/Validator'
import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import {
	CitizenRegisterQuestionObservation,
	CitizenRegisterQuestionResponse,
	CitizenRegisterQuestionType,
	SatisfactionType
} from './types'

export class CitizenRegisterResponse extends Entity<CitizenRegisterResponse, CitizenRegisterQuestionResponse> {
	readonly questionId: Id
	readonly question: string
	readonly questionType: CitizenRegisterQuestionType
	readonly options?: string[]
	readonly multiSelect?: boolean
	readonly allowOtherOptions?: boolean
	readonly optional?: boolean
	readonly response: CitizenRegisterQuestionResponse['response']
	readonly specificResponse?: string
	readonly observations?: CitizenRegisterQuestionObservation[]

	constructor(props: CitizenRegisterQuestionResponse, allowEmptyResponse?: boolean) {
		super(props, props.questionId)

		this.questionId = new Id(props.questionId)
		this.question = props.question ? props.question.trim() : props.question
		this.questionType = props.questionType
		this.response = props.response
		this.optional = props.optional
		this.options = props.options
		this.multiSelect = props.multiSelect
		this.allowOtherOptions = props.allowOtherOptions
		this.specificResponse = props.specificResponse ? props.specificResponse?.trim() : props.specificResponse
		this.observations = props.observations

		const errors = Validator.stackErros(
			Validator.notEmpty(this.question, `Questão ${this.questionId.value} - ${citizenRegisterErrors.EMPTY_QUESTION}`),
			this.validateOptions(),
			this.validateResponse(allowEmptyResponse)
		)

		if (errors) throw new Error(errors.join(', '))
	}

	private validateResponse(allowEmptyResponse?: boolean): string | null {
		switch (this.questionType) {
			case 'textual':
				return this.validateTextualResponse(allowEmptyResponse)
			case 'numerical':
				return this.validateNumericalResponse(allowEmptyResponse)
			case 'binary':
				return this.validateBinaryResponse(allowEmptyResponse)
			case 'select':
				return this.validateSelectResponse(allowEmptyResponse)
			case 'satisfaction':
				return this.validateSatisfactionResponse(allowEmptyResponse)
			default:
				return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_QUESTION_TYPE}`
		}
	}

	private validateTextualResponse(allowEmptyResponse?: boolean): string | null {
		if (typeof this.response === 'string') {
			if ((allowEmptyResponse || this.optional) || !!this.response?.trim()) {
				return null
			}
		}
		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	}

	private validateNumericalResponse(allowEmptyResponse?: boolean): string | null {
		if (typeof this.response === 'number' || (typeof this.response === 'string' && !Number.isNaN(Number(this.response)))) {
			if ((allowEmptyResponse || this.optional) || (!!this.response || (this.response === '0' || this.response === 0))) {
				return null
			}
		}
		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	}

	private validateBinaryResponse(allowEmptyResponse?: boolean): string | null {
		if ((allowEmptyResponse || this.optional)) return null
		if (typeof this.response === 'boolean' || (typeof this.response === 'string' && ['sim', 'não'].includes(this.response.toLowerCase()))) {
			return null
		}
		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	}

	private validateSelectResponse(allowEmptyResponse?: boolean): string | null {
		if ((allowEmptyResponse || this.optional)) return null
		if (this.specificResponse && this.allowOtherOptions) return null

		if (!Array.isArray(this.response) || (this.response && !this.response.length)) {
			return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
		}
		if (!this.multiSelect && this.response.length > 1) {
			return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
		}
		if (this.options && !this.response.every((res) => this.options!.includes(res) || this.allowOtherOptions)) {
			return `Questão ${this.questionId.value} - ${citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS}`
		}
		return null
	}

	private validateSatisfactionResponse(allowEmptyResponse?: boolean): string | null {
		if ((allowEmptyResponse || this.optional)) return null

		const satisfactionValues: SatisfactionType[] = [1, 2, 3, 4, 5]
		const validResponse = Converter.convertToInt(`${this.response}` as string)
		if (satisfactionValues.includes(validResponse as SatisfactionType)) {
			return null
		}
		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	}

	private validateOptions(): string | null {
		if (this.questionType === 'select') {
			const validOptions = (this.options || []).filter((option) => option && typeof option === 'string')
			if (!validOptions.length && !(this.allowOtherOptions && this.specificResponse)) {
				return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_QUESTION_OPTIONS}`
			}
		}
		return null
	}

	data(): CitizenRegisterQuestionResponse {
		const { questionId, question, questionType, options, multiSelect, allowOtherOptions, response, specificResponse, observations } = this
		const props: Partial<CitizenRegisterQuestionResponse> = { questionId: questionId.value, question, questionType, response }

		if (options) props.options = options
		if (multiSelect !== undefined) props.multiSelect = multiSelect
		if (allowOtherOptions !== undefined) props.allowOtherOptions = allowOtherOptions
		if (specificResponse !== undefined && specificResponse) props.specificResponse = specificResponse
		if (observations) props.observations = observations

		return props as CitizenRegisterQuestionResponse
	}
}
