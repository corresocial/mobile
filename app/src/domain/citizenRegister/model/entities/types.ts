// Raiz do agregado

export type CitizenRegisterEntityOptional = Partial<CitizenRegisterEntity>
export type CitizenRegisterEntity = {
	citizenRegisterId: string
	citizenHasAccount?: boolean
	name: string
	cellNumber: string
	censusTakerName: string,
	censusTakerId: string,
	coordinatorId: string,
	createdAt: Date
	location: CitizenRegisterLocation
	responses: CitizenRegisterQuestionResponse[]

	incomeStatus: CitizenRegisterStatus
	updates?: CitizenResponseUpdate[]
}

export interface CitizenResponseUpdate extends CitizenRegisterQuestionResponse {
	questionId: string
	timestamp: Date
	value: string | string[] | number | boolean | SatisfactionType
}

export type CitizenRegisterStatus = {
	suggestedOpportunityIds: string[] | [],
	status: IncomeStatusType
}

export type IncomeStatusType = 'uncontacted' | 'withoutContact' | 'invalidContact' | 'invalid' | 'awaitingConfirmation' | 'generatingDescription' | 'awaitingRecommendation' | 'recommendationsMade' | 'hired'

export type CitizenRegisterQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction' | 'select'
export type SatisfactionType = 1 | 2 | 3 | 4 | 5

export type CitizenRegisterQuestionResponse = {
	questionId: string
	question: string
	questionType: CitizenRegisterQuestionType
	response: string | string[] | number | boolean | SatisfactionType
	optional?: boolean
	options?: string[]
	multiSelect?: boolean
	allowOtherOptions?: boolean
	specificResponse?: string
	observations?: CitizenRegisterQuestionObservation[]
}

export type CitizenRegisterQuestionObservation = {
	questionId: string
	message: string
}

export type CitizenRegisterLocation = {
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

export type Coordinates = {
	latitude: number
	longitude: number
}
