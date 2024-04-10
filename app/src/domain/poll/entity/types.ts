import { UserOwner } from '@domain/user/entity/types'

export type PollEntityOptional = Partial<PollEntity>
export type PollEntity = {
	pollId: string
	title: string
	description: string
	createdAt: Date
	range: PollRange
	location: PollLocation
	questions: PollQuestion[]
	owner: UserOwner
	idUsersResponded?: string[]
	userResponses?: PrivatePollResponse
}

export type PollQuestionOptional = Partial<PollQuestion>
export type PollQuestion = {
	questionId: string
	question: string
	questionType: PollQuestionType
}

export type PollQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction'

type PollRange = 'near' | 'city' | 'country'
type PollLocation = {
	country: string
	state: string
	city: string
	district: string
	street: string
	postalCode: string
	number: string
	coordinates: Coordinates
	geohashNearby: string[]
}

type PrivatePollResponse = {
	userId: string
	coordinates: Coordinates
	responses: PollResponse[]
}

export type PollResponse = {
	questionId: string
	questionType: PollQuestionType
	response: string | number | boolean | SatisfactionType // Melhorar nomenclaturas
}

export type SatisfactionType = 1 | 2 | 3 | 4 | 5

export type Coordinates = {
	latitude: number
	longitude: number
}
