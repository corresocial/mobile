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
