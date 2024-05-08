import { PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

interface PetitionRepositoryInterface {
	getPetitionDataById: (petitionId: string) => Promise<PetitionEntity | undefined>
	getPrivateResponses: (petitionId: string) => Promise<PetitionEntity['privateResponses']>

	createPetition: (petitionData: PetitionEntityOptional) => Promise<void>
	createPetitionResponse: (petitionId: string, data: PrivatePetitionResponse) => Promise<void>

	updatePetition: (petitionId: string, data: PetitionEntityOptional, fieldName?: keyof PetitionEntityOptional) => Promise<void>
	updatePetitionArrayField: (petitionId: string, data: any, fieldName: keyof PetitionEntityOptional) => Promise<void>

	deletePetition: (petitionId: string) => Promise<void>
}

export { PetitionRepositoryInterface }
