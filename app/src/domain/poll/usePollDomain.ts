import { createNewPollDM } from './methods/createNewPollDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { getPollResponsesDM } from './methods/getPollResponsesDM'
import { sendPollResponseDM } from './methods/sendPollResponseDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface { // PollDomainInterface
	return {
		getPollData: getPollDataDM,
		getPollResponses: getPollResponsesDM,

		createNewPoll: createNewPollDM,
		sendPollResponse: sendPollResponseDM
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
