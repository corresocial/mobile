export type PollEntityOptional = Partial<PollEntity>
export type PollEntity = {
	pollId: string
	title: string
	description: string
	createdAt: Date
	range: PollRange
	location: {
		coordinates: Coordinates
		geohashNearby: string[]
	}
	questions: PollQuestion[]
	idUsersResponded?: string[]
	userResponses?: PrivatePollResponse
}

type PollRange = 'near' | 'city' | 'country'

export type PollQuestionOptional = Partial<PollQuestion>
export type PollQuestion = {
	questionId: string
	question: string
	questionType: PollQuestionType
}

export type PollQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction'
type PrivatePollResponse = {
	userId: string
	coordinates: Coordinates
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
