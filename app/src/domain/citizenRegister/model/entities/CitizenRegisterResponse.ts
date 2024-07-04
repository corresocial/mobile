import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'
import { Validator } from '@domain/shared/utils/Validator'
import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import {
	CitizenRegisterQuestionObservation,
	CitizenRegisterQuestionResponse,
	CitizenRegisterQuestionType
} from './types'

export class CitizenRegisterResponse extends Entity<CitizenRegisterResponse, CitizenRegisterQuestionResponse> {
	readonly questionId: Id
	readonly question: string
	readonly questionType: CitizenRegisterQuestionType
	readonly options?: string[]
	readonly multiSelect?: boolean
	readonly allowOtherOptions?: boolean
	readonly response: CitizenRegisterQuestionResponse['response']
	readonly specificResponse?: string
	readonly observations?: CitizenRegisterQuestionObservation[]

	constructor(props: CitizenRegisterQuestionResponse) {
		super(props, props.questionId)

		this.questionId = new Id(props.questionId)
		this.question = props.question.trim()
		this.questionType = props.questionType
		this.response = props.response
		this.options = props.options
		this.multiSelect = props.multiSelect
		this.allowOtherOptions = props.allowOtherOptions
		this.specificResponse = props.specificResponse?.trim()
		this.observations = props.observations

		const errors = Validator.stackErros(
			Validator.notEmpty(this.question, `Questão ${this.questionId.value} - ${citizenRegisterErrors.EMPTY_QUESTION}`),
			// this.validateResponse(),
			// this.validateOptions(),
			// this.validateSpecificResponse()
		)

		if (errors) throw new Error(errors.join(', '))
	}

	// private validateResponse(): string | null {
	// 	switch (this.questionType) {
	// 		case 'textual':
	// 			return this.validateTextualResponse()
	// 		case 'numerical':
	// 			return this.validateNumericalResponse()
	// 		case 'binary':
	// 			return this.validateBinaryResponse()
	// 		case 'select':
	// 			return this.validateSelectResponse()
	// 		case 'satisfaction':
	// 			return this.validateSatisfactionResponse()
	// 		default:
	// 			return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_QUESTION_TYPE}`
	// 	}
	// }

	// private validateTextualResponse(): string | null {
	// 	if (typeof this.response === 'string') {
	// 		return null
	// 	}
	// 	return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// }

	// private validateNumericalResponse(): string | null {
	// 	if (typeof this.response === 'number' || (typeof this.response === 'string' && !Number.isNaN(Number(this.response)))) {
	// 		return null
	// 	}
	// 	return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// }

	// private validateBinaryResponse(): string | null {
	// 	if (typeof this.response === 'boolean' || (typeof this.response === 'string' && ['sim', 'não'].includes(this.response.toLowerCase()))) {
	// 		return null
	// 	}
	// 	return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// }

	// private validateSelectResponse(): string | null {
	// 	if (!Array.isArray(this.response)) {
	// 		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// 	}
	// 	if (!this.multiSelect && this.response.length > 1) {
	// 		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// 	}
	// 	if (this.options && !this.response.every((res) => this.options!.includes(res))) {
	// 		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS}`
	// 	}
	// 	return null
	// }

	// private validateSatisfactionResponse(): string | null {
	// 	const satisfactionValues: SatisfactionType[] = [1, 2, 3, 4, 5]
	// 	if (satisfactionValues.includes(this.response as SatisfactionType)) {
	// 		return null
	// 	}
	// 	return `Questão ${this.questionId.value} - ${citizenRegisterErrors.INVALID_RESPONSE_TYPE}`
	// }

	// private validateOptions(): string | null {
	// 	if (this.questionType === 'select' && this.options) {
	// 		const responseArray = Array.isArray(this.response) ? this.response : [this.response as string]
	// 		const invalidOptions = responseArray.filter((res) => !this.options!.includes(res))
	// 		if (invalidOptions.length > 0 && !(this.allowOtherOptions && this.specificResponse)) {
	// 			return `Questão ${this.questionId.value} - ${citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS}`
	// 		}
	// 	}
	// 	return null
	// }

	// private validateSpecificResponse(): string | null {
	// 	if (this.allowOtherOptions && (this.options || [])[(this.options || []).length - 1] === this.response && !this.specificResponse) {
	// 		return `Questão ${this.questionId.value} - ${citizenRegisterErrors.MISSING_SPECIFIC_RESPONSE}`
	// 	}
	// 	return null
	// }

	data(): CitizenRegisterQuestionResponse {
		const { questionId, question, questionType, options, multiSelect, allowOtherOptions, response, specificResponse, observations } = this
		const props: Partial<CitizenRegisterQuestionResponse> = { questionId: questionId.value, question, questionType, response }

		if (options) props.options = options
		if (multiSelect !== undefined) props.multiSelect = multiSelect
		if (allowOtherOptions !== undefined) props.allowOtherOptions = allowOtherOptions
		if (specificResponse !== undefined) props.specificResponse = specificResponse
		if (observations) props.observations = observations

		return props as CitizenRegisterQuestionResponse
	}
}
