import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PrivatePetitionResponse } from '../entity/types'

async function sendPetitionResponseDM(
	usePetitionRepository: () => PetitionRepositoryInterface,
	petitionId: string,
	responseData: PrivatePetitionResponse
) {
	try {
		const { createPetitionResponse, updatePetitionArrayField } = usePetitionRepository()
		await createPetitionResponse(petitionId, responseData)
		await updatePetitionArrayField(petitionId, responseData.userId, 'idUsersResponded')
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { sendPetitionResponseDM }
