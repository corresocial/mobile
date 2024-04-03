import { createNewPollDM } from './methods/createNewPollDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface { // PollDomainInterface
	return {
		getPollData: getPollDataDM,
		// getPollResponses

		createNewPoll: createNewPollDM
		// sendPollResponse
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
