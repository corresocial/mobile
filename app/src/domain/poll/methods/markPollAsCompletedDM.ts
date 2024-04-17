import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

async function markPollAsCompletedDM(usePollRepository: () => PollRepositoryInterface, pollId: string) {
	try {
		const { updatePoll } = usePollRepository()
		return updatePoll(pollId, { completed: true })
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { markPollAsCompletedDM }
