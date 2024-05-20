import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntityOptional } from '../entity/types'

async function updateOwnerDataOnPetitionsDM(
	usePetitionRepository: () => PetitionRepositoryInterface,
	ownerData: Partial<PetitionEntityOptional['owner']>
) {
	try {
		const { getPetitionIdsByUser, updateOwnerDataOnPetitions } = usePetitionRepository()

		if (!ownerData?.userId) throw new Error('Id de usuário inválido')

		const petitionIds = await getPetitionIdsByUser(ownerData.userId)
		await updateOwnerDataOnPetitions(ownerData, petitionIds || [])
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { updateOwnerDataOnPetitionsDM }
