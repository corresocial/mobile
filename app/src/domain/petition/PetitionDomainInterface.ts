import { UserOwner } from '@domain/user/entity/types'

import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity, PrivatePetitionResponse } from './entity/types'

interface PetitionDomainInterface {
	getPetitionData: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<PetitionEntity | undefined>
	getPetitionsByOwner(usePetitionRepository: () => PetitionRepositoryInterface, userId: string, pageSize?: number, lastPetition?: PetitionEntity): Promise<PetitionEntity[]> | PetitionEntity[]

	createNewPetition: (usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) => Promise<void> | undefined
	sendPetitionResponse: (
		usePetitionRepository: () => PetitionRepositoryInterface,
		petitionId: string,
		responseData: PrivatePetitionResponse) => Promise<void>
	generatePetitionResultsReport: (usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) => Promise<string>

	markPetitionAsCompleted: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<void>
	updateOwnerDataOnPetitions: (usePetitionRepository: () => PetitionRepositoryInterface, ownerPost: Partial<UserOwner>) => Promise<boolean | void>

	deletePetitionData: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<void>
}

export { PetitionDomainInterface }
