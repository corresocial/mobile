import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

function deletePetitionDataDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) {
	try {
		const { deletePetition } = usePetitionRepository()
		return deletePetition(petitionId)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { deletePetitionDataDM }
