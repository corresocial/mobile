import { UserOwner } from '@domain/user/entity/types'

import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

async function updateOwnerDataOnPetitionsDM(
	usePetitionRepository: () => PetitionRepositoryInterface,
	ownerData: Partial<UserOwner>
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
