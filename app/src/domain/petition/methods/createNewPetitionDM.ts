import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity } from '../entity/types'

import { structurePetitionDataDM } from '../core/structurePetitionDataDM'

async function createNewPetitionDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) {
	try {
		const { createPetition, uploadPetitionMedia } = usePetitionRepository()

		let picturesUrl: string[] = []
		if (petitionData && petitionData.picturesUrl && petitionData.picturesUrl.length) {
			picturesUrl = await uploadPetitionMedia(petitionData.picturesUrl, 'pictures')
		}

		const structuredPetitionData = structurePetitionDataDM({ ...petitionData, picturesUrl })

		return createPetition(structuredPetitionData)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { createNewPetitionDM }
