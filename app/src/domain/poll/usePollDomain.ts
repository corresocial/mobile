import { createNewPollDM } from './methods/createNewPollDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { sendPollResponseDM } from './methods/sendPollResponseDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface { // PollDomainInterface
	return {
		getPollData: getPollDataDM,
		// getPollResponses

		createNewPoll: createNewPollDM,
		sendPollResponse: sendPollResponseDM
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
