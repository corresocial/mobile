import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity } from '../entity/types'

import { structurePetitionDataDM } from '../core/structurePetitionDataDM'

function createNewPetitionDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) {
	try {
		const { createPetition } = usePetitionRepository()

		// Fazer upload de assets

		const structuredPetitionData = structurePetitionDataDM(petitionData)

		return createPetition(structuredPetitionData)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { createNewPetitionDM }
