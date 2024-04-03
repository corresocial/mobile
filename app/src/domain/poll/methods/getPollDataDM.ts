import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

function getPollDataDM(usePollRepository: () => PollRepositoryInterface, pollId: string) {
	try {
		const { getPollDataById } = usePollRepository()

		return getPollDataById(pollId)
	} catch (error: any) {
		console.log(error)
		// throw new Error(error)
	}
}

export { getPollDataDM }
