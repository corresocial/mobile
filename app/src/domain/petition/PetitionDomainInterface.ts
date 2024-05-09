import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity, PrivatePetitionResponse } from './entity/types'

interface PetitionDomainInterface {
	getPetitionData: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<PetitionEntity | undefined>

	createNewPetition: (usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) => Promise<void> | undefined
	sendPetitionResponse: (
		usePetitionRepository: () => PetitionRepositoryInterface,
		petitionId: string,
		responseData: PrivatePetitionResponse) => Promise<void>
	generatePetitionResultsReport: (usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) => Promise<string>
	markPetitionAsCompleted: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<void>

	deletePetitionData: (usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) => Promise<void>
}

export { PetitionDomainInterface }
