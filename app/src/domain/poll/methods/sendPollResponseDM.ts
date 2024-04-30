import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PrivatePollResponse } from '../entity/types'

async function sendPollResponseDM(
	usePollRepository: () => PollRepositoryInterface,
	pollId: string,
	responseData: PrivatePollResponse
) {
	try {
		const { createPollResponse, updatePollArrayField } = usePollRepository()
		await createPollResponse(pollId, responseData)
		await updatePollArrayField(pollId, responseData.userId, 'idUsersResponded')
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { sendPollResponseDM }
