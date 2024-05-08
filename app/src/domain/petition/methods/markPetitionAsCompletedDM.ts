import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

async function markPetitionAsCompletedDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionId: string) {
	try {
		const { updatePetition } = usePetitionRepository()
		return updatePetition(petitionId, { completed: true })
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { markPetitionAsCompletedDM }
