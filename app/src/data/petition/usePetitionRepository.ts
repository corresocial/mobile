import { PetitionRepositoryInterface } from './PetitionRepositoryInterface'
import { createPetition } from './remoteRepository/createPetition'
import { createPetitionResponse } from './remoteRepository/createPetitionResponse'
import { deletePetition } from './remoteRepository/deletePetition'
import { getPetitionDataById } from './remoteRepository/getPetitionById'
import { getPetitionIdsByUser } from './remoteRepository/getPetitionIdsByUser'
import { getPetitionsByUser } from './remoteRepository/getPetitionsByUser'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'
import { updateOwnerDataOnPetitions } from './remoteRepository/updateOwnerDataOnPetitions'
import { updatePetition } from './remoteRepository/updatePetition'
import { updatePetitionArrayField } from './remoteRepository/updatePetitionArrayField'
import { uploadPetitionMedia } from './remoteRepository/updatePetitionMedia'

function usePetitionRepository(): PetitionRepositoryInterface {
	return {
		getPetitionDataById: getPetitionDataById,
		getPrivateResponses: getPrivateResponses,
		getPetitionsByUser: getPetitionsByUser,
		getPetitionIdsByUser: getPetitionIdsByUser,

		createPetition: createPetition,
		createPetitionResponse: createPetitionResponse,

		updatePetition: updatePetition,
		updatePetitionArrayField: updatePetitionArrayField,
		updateOwnerDataOnPetitions: updateOwnerDataOnPetitions,

		deletePetition: deletePetition,

		uploadPetitionMedia: uploadPetitionMedia
	}
}

export { usePetitionRepository }
