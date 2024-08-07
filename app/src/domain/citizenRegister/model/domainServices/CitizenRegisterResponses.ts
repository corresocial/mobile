import { CitizenRegisterQuestionResponse } from '../entities/types'

import { CitizenRegisterResponse } from '../entities/CitizenRegisterResponse'

export class CitizenRegisterResponses {
	readonly questionResponses: CitizenRegisterResponse[]

	constructor(responses: CitizenRegisterQuestionResponse[], allowEmptyResponses?: boolean) {
		this.questionResponses = responses.map((response) => new CitizenRegisterResponse(response, allowEmptyResponses))
	}

	getByQuestionId(questionId: string): CitizenRegisterResponse | undefined {
		return this.questionResponses.find((response) => response.questionId.value === questionId)
	}

	data(): CitizenRegisterQuestionResponse[] {
		const allResponses: CitizenRegisterQuestionResponse[] = []
		this.questionResponses.forEach((response) => {
			const responseObject = response.data()
			allResponses.push(responseObject)
		})
		return allResponses
	}

	// MODEL
	// add(response: CitizenRegisterQuestionResponse): CitizenRegisterResponses {
	// 	const updatedResponses = [...this.questionResponses, new CitizenRegisterResponse(response)]
	// 	return new CitizenRegisterResponses(updatedResponses)
	// }

	// update(response: CitizenRegisterQuestionResponse): CitizenRegisterResponses {
	// 	const updatedResponses = this.questionResponses.map((existingResponse) => {
	// 		if (existingResponse.questionId.value === response.questionId) {
	// 			return new CitizenRegisterResponse(response)
	// 		}
	// 		return existingResponse
	// 	})
	// 	return new CitizenRegisterResponses(updatedResponses)
	// }

	// delete(questionId: string): CitizenRegisterResponses {
	// 	const updatedResponses = this.questionResponses.filter((response) => response.questionId.value !== questionId)
	// 	return new CitizenRegisterResponses(updatedResponses)
	// }
}
