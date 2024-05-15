import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { createPollResponse } from './remoteRepository/createPollResponse'
import { deletePoll } from './remoteRepository/deletePoll'
import { getPollDataById } from './remoteRepository/getPollById'
import { getPollsByUser } from './remoteRepository/getPollsByUser'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'
import { updatePoll } from './remoteRepository/updatePoll'
import { updatePollArrayField } from './remoteRepository/updatePollArrayField'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		getPrivateResponses: getPrivateResponses,
		getPollsByUser: getPollsByUser,

		createPoll: createPoll,
		createPollResponse: createPollResponse,

		updatePoll: updatePoll,
		updatePollArrayField: updatePollArrayField,

		deletePoll: deletePoll
	}
}

export { usePollRepository }
