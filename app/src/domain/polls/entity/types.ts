export type PollEntityOptional = Partial<PollEntity>
export type PollEntity = {
	id: string
	title: string
	description: string
	questions: [
		{
			questionId: string
			question: string
			questionType: PollQuestionType
		}
	]
	idUsersResponded: string[]
	userResponses?: PrivatePollResponse
}

export type PollQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction'
type PrivatePollResponse = {
	userId: string
	coordinates: Coordinates[]
	responses: [
		{
			questionId: string
			response: string | number | boolean | number // Melhorar nomenclaturas
		}
	]
}

export type Coordinates = {
	latitude: number
	longitude: number
}
