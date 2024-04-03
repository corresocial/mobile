import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { getPollDataById } from './remoteRepository/getPollById'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		// getPollResponsesData

		createPoll: createPoll
		// savePollResponse

		// updatePoll

		// deletePoll
	}
}

export { usePollRepository }
