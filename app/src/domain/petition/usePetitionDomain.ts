import { createNewPetitionDM } from './methods/createNewPetitionDM'
import { deletePetitionDataDM } from './methods/deletePetitionDataDM'
import { generatePetitionResultsReportDM } from './methods/generatePetitionResultsReportDM'
import { getPetitionDataDM } from './methods/getPetitionDataDM'
import { getPetitionsByOwnerDM } from './methods/getPetitionsByOwnerDM'
import { markPetitionAsCompletedDM } from './methods/markPetitionAsCompletedDM'
import { sendPetitionResponseDM } from './methods/sendPetitionResponseDM'
import { PetitionDomainInterface } from './PetitionDomainInterface'

function usePetitionDomain(): PetitionDomainInterface {
	return {
		getPetitionData: getPetitionDataDM,
		getPetitionsByOwner: getPetitionsByOwnerDM,

		createNewPetition: createNewPetitionDM,
		sendPetitionResponse: sendPetitionResponseDM,
		generatePetitionResultsReport: generatePetitionResultsReportDM,
		markPetitionAsCompleted: markPetitionAsCompletedDM,

		deletePetitionData: deletePetitionDataDM
	}
}

export { usePetitionDomain }
