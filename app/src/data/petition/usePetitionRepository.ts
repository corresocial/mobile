import { PetitionRepositoryInterface } from './PetitionRepositoryInterface'
import { createPetition } from './remoteRepository/createPetition'
import { createPetitionResponse } from './remoteRepository/createPetitionResponse'
import { deletePetition } from './remoteRepository/deletePetition'
import { getPetitionDataById } from './remoteRepository/getPetitionById'
import { getPetitionsByUser } from './remoteRepository/getPetitionsByUser'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'
import { updatePetition } from './remoteRepository/updatePetition'
import { updatePetitionArrayField } from './remoteRepository/updatePetitionArrayField'

function usePetitionRepository(): PetitionRepositoryInterface {
	return {
		getPetitionDataById: getPetitionDataById,
		getPrivateResponses: getPrivateResponses,
		getPetitionsByUser: getPetitionsByUser,

		createPetition: createPetition,
		createPetitionResponse: createPetitionResponse,

		updatePetition: updatePetition,
		updatePetitionArrayField: updatePetitionArrayField,

		deletePetition: deletePetition
	}
}

export { usePetitionRepository }
