import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'
import { Validator } from '@domain/shared/utils/Validator'
import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import { CitizenRegisterQuestionObservation, CitizenRegisterQuestionResponse, CitizenRegisterQuestionType, SatisfactionType } from './types'

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
		this.question = props.question.trim() // MODEL Text
		this.questionType = props.questionType // MODEL Question Type
		this.response = props.response
		this.options = props.options
		this.multiSelect = props.multiSelect
		this.allowOtherOptions = props.allowOtherOptions
		this.specificResponse = props.specificResponse?.trim()
		this.observations = props.observations

		const errors = Validator.stackErros(
			Validator.notEmpty(this.question, citizenRegisterErrors.EMPTY_QUESTION),
			this.validateResponse(),
			this.validateOptions(),
			this.validateSpecificResponse()
		)

		if (errors) throw new Error(errors.join(', '))
	}

	private validateResponse(): string | null {
		switch (this.questionType) {
			case 'textual':
				return typeof this.response === 'string' ? null : citizenRegisterErrors.INVALID_RESPONSE_TYPE
			case 'numerical':
				return typeof this.response === 'number' ? null : citizenRegisterErrors.INVALID_RESPONSE_TYPE
			case 'binary':
				return typeof this.response === 'boolean' ? null : citizenRegisterErrors.INVALID_RESPONSE_TYPE
			case 'select':
				return Array.isArray(this.response) && this.response.every((res) => typeof res === 'string')
					? null
					: citizenRegisterErrors.INVALID_RESPONSE_TYPE
			case 'satisfaction':
				return [1, 2, 3, 4, 5].includes(this.response as SatisfactionType) ? null : citizenRegisterErrors.INVALID_RESPONSE_TYPE
			default:
				return citizenRegisterErrors.INVALID_QUESTION_TYPE
		}
	}

	private validateOptions(): string | null {
		if (this.questionType === 'select' && this.options && Array.isArray(this.response)) {
			if (!this.multiSelect && this.response.length > 1) {
				return citizenRegisterErrors.INVALID_RESPONSE_TYPE
			}
			const invalidOptions = this.response.filter((res) => !this.options!.includes(res))
			if (invalidOptions.length > 0 && !(this.allowOtherOptions && this.specificResponse)) {
				return citizenRegisterErrors.RESPONSE_NOT_IN_OPTIONS
			}
		}
		return null
	}

	private validateSpecificResponse(): string | null {
		if (this.allowOtherOptions && !this.specificResponse) {
			return citizenRegisterErrors.MISSING_SPECIFIC_RESPONSE
		}
		return null
	}
}
