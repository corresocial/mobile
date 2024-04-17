import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { createPollResponse } from './remoteRepository/createPollResponse'
import { deletePoll } from './remoteRepository/deletePoll'
import { getPollDataById } from './remoteRepository/getPollById'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'
import { updatePoll } from './remoteRepository/updatePoll'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		getPrivateResponses: getPrivateResponses,

		createPoll: createPoll,
		createPollResponse: createPollResponse,

		updatePoll: updatePoll,

		deletePoll: deletePoll
	}
}

export { usePollRepository }
