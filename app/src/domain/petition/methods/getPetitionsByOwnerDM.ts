import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity } from '../entity/types'

export function getPetitionsByOwnerDM(usePetitionRepository: () => PetitionRepositoryInterface, userId: string, pageSize?: number, lastPetition?: PetitionEntity) {
	try {
		const { getPetitionsByUser } = usePetitionRepository()

		return getPetitionsByUser(userId, pageSize, lastPetition)
	} catch (error) {
		console.log(error)
		return [] as PetitionEntity[]
	}
}
