import { createNewPollDM } from './methods/createNewPollDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface { // PollDomainInterface
	return {
		// getPollQuestions
		// getPollResponses

		createNewPoll: createNewPollDM
		// sendPollResponse
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
