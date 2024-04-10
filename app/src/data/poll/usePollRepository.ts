import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { createPollResponse } from './remoteRepository/createPollResponse'
import { getPollDataById } from './remoteRepository/getPollById'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		getPrivateResponses: getPrivateResponses,

		createPoll: createPoll,
		createPollResponse: createPollResponse,

		// updatePoll

		// deletePoll
	}
}

export { usePollRepository }
