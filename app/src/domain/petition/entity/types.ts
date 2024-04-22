export type PetitionEntityOptional = Partial<PetitionEntity>
export type PetitionEntity = {
	petitionId: string
	title: string
	description: string
	createdAt: Date
	range: PetitionRange
	location: PetitionLocation
	owner: UserOwner
	idUsersResponded?: string[]
	completed?: boolean
	privateResponses?: PetitionResponse[]
}

export type UserOwner = {
	userId: string
	name: string
	profilePictureUrl?: string[]
}

type PetitionRange = 'near' | 'city' | 'country'
type PetitionLocation = {
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

type PetitionResponse = {
	userId: string
	userName: string
	email: string
	cellNumber: string
	rg: string
	cpf: string
	location: PetitionLocation
}
