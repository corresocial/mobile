import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

async function getPollResponsesDM(usePollRepository: () => PollRepositoryInterface, pollId: string) {
	try {
		const { getPrivateResponses } = usePollRepository() // REFACTOR Implementar segurança para permitir somente o dono obter
		return getPrivateResponses(pollId)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { getPollResponsesDM }
