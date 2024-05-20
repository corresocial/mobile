import { PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

import { StorageFolder } from '@data/user/remoteRepository/uploadUserMedia'

interface PetitionRepositoryInterface {
	getPetitionDataById: (petitionId: string) => Promise<PetitionEntity | undefined>
	getPrivateResponses: (petitionId: string) => Promise<PetitionEntity['privateResponses']>
	getPetitionsByUser: (userId: string, maxDocs?: number, lastDoc?: any) => Promise<PetitionEntity[]>
	getPetitionIdsByUser: (userId: string) => Promise<string[]>

	createPetition: (petitionData: PetitionEntityOptional) => Promise<void>
	createPetitionResponse: (petitionId: string, data: PrivatePetitionResponse) => Promise<void>

	updatePetition: (petitionId: string, data: PetitionEntityOptional, fieldName?: keyof PetitionEntityOptional) => Promise<void>
	updatePetitionArrayField: (petitionId: string, data: any, fieldName: keyof PetitionEntityOptional) => Promise<void>
	updateOwnerDataOnPetitions: (ownerPost: Partial<PetitionEntityOptional['owner']>, userPostIds: string[]) => Promise<boolean>

	deletePetition: (petitionId: string) => Promise<void>

	uploadPetitionMedia: (mediaUri: string[], folder: StorageFolder) => Promise<string[]>
}

export { PetitionRepositoryInterface }
