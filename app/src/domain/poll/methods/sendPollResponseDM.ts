import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity } from '../entity/types'

async function sendPollResponseDM(
	usePollRepository: () => PollRepositoryInterface,
	pollId: string,
	responseData: PollEntity['privateResponses']
) {
	try {
		const { createPollResponse } = usePollRepository()
		await createPollResponse(pollId, responseData)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { sendPollResponseDM }
