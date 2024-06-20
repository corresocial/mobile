// Raiz do agregado

export type CitizenRegisterEntityOptional = Partial<CitizenRegisterEntity>
export type CitizenRegisterEntity = {
	// id: string
	citizenRegisterId: string
	citizenHasAccount?: boolean
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
	allowOtherOptions?: boolean
	response: string | string[] | number | boolean | SatisfactionType
	specificResponse?: string
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

// Questions

export type CitizenRegisterQuestionOptional = Partial<CitizenRegisterQuestion>
export type CitizenRegisterQuestion = { // CURRENT Verificar se ainda está sendo utilzado
	questionId: string
	question: string
	questionType: CitizenRegisterQuestionType
	options?: string[]
	multiSelect?: boolean
}
