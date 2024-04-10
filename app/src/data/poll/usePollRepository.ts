import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { createPollResponse } from './remoteRepository/createPollResponse'
import { getPollDataById } from './remoteRepository/getPollById'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		// getPollResponsesData

		createPoll: createPoll,
		createPollResponse: createPollResponse,

		// updatePoll

		// deletePoll
	}
}

export { usePollRepository }
