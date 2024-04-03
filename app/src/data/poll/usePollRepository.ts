import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'

function usePollRepository(): PollRepositoryInterface {
	return {
		// getPollData
		// getPollResponsesData

		createPoll: createPoll
		// savePollResponse

		// updatePoll

		// deletePoll
	}
}

export { usePollRepository }
