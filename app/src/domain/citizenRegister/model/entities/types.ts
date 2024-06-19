// Raiz do agregado

export type CitizenRegisterEntityOptional = Partial<CitizenRegisterEntity>
export type CitizenRegisterEntity = {
	// id: string
	citizenRegisterId: string
	userId?: string
	name: string
	cellNumber: string
	censusTakerName: string,
	censusTakerId: string,
	createdAt: Date
	location: CitizenRegisterLocation
	responses: CitizenRegisterQuestionResponse[]
}

export type CitizenRegisterQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction' | 'select'
export type SatisfactionType = 1 | 2 | 3 | 4 | 5

export type CitizenRegisterQuestionResponse = {
	questionId: string
	question: string
	questionType: CitizenRegisterQuestionType
	options?: string[]
	multiSelect?: boolean
	response: string | string[] | number | boolean | SatisfactionType
	notes?: CitizenRegisterQuestionNote[]
}

export type CitizenRegisterQuestionNote = {
	questionId: string
	text: string
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

// Question

export type CitizenRegisterQuestionary = {
	citizenRegisterId: string
	createdAt: Date
	questions: CitizenRegisterQuestion[]
}

export type CitizenRegisterQuestionOptional = Partial<CitizenRegisterQuestion>
export type CitizenRegisterQuestion = {
	questionId: string
	question: string
	questionType: CitizenRegisterQuestionType
	options?: string[]
	multiSelect?: boolean
}
