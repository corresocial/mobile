import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity } from '../entity/types'

import { structurePollDataDM } from '../core/structurePollDataDM'

function createNewPollDM(usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) {
	try {
		const { createPoll } = usePollRepository()

		const structuredPollData = structurePollDataDM(pollData)

		return createPoll(structuredPollData)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { createNewPollDM }
