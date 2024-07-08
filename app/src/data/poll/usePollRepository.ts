import { PollRepositoryInterface } from './PollRepositoryInterface'
import { createPoll } from './remoteRepository/createPoll'
import { createPollResponse } from './remoteRepository/createPollResponse'
import { deletePoll } from './remoteRepository/deletePoll'
import { getPollDataById } from './remoteRepository/getPollById'
import { getPollIdsByUser } from './remoteRepository/getPollIdsByUser'
import { getPollsByUser } from './remoteRepository/getPollsByUser'
import { getPrivateResponses } from './remoteRepository/getPrivateResponses'
import { updateOwnerDataOnPolls } from './remoteRepository/updateOwnerDataOnPolls'
import { updatePoll } from './remoteRepository/updatePoll'
import { updatePollArrayField } from './remoteRepository/updatePollArrayField'

function usePollRepository(): PollRepositoryInterface {
	return {
		getPollDataById: getPollDataById,
		getPrivateResponses: getPrivateResponses,
		getPollsByUser: getPollsByUser,
		getPollIdsByUser: getPollIdsByUser,

		createPoll: createPoll,
		createPollResponse: createPollResponse,

		updatePoll: updatePoll,
		updatePollArrayField: updatePollArrayField,
		updateOwnerDataOnPolls: updateOwnerDataOnPolls,

		deletePoll: deletePoll
	}
}

export { usePollRepository }
