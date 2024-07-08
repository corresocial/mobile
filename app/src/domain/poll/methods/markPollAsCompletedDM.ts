import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

async function markPollAsCompletedDM(usePollRepository: () => PollRepositoryInterface, pollId: string, currentCompletedState: boolean) {
	try {
		const { updatePoll } = usePollRepository()
		return updatePoll(pollId, { completed: !currentCompletedState })
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { markPollAsCompletedDM }
