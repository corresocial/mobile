import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

function getPetitionDataDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) {
	try {
		const { getPetitionDataById } = usePetitionRepository()

		return getPetitionDataById(petitionId)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { getPetitionDataDM }
