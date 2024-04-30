import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

function deletePollDataDM(usePollRepository: () => PollRepositoryInterface, pollId: string) {
	try {
		const { deletePoll } = usePollRepository()
		return deletePoll(pollId)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { deletePollDataDM }
