import { createNewPollDM } from './methods/createNewPollDM'
import { generatePollResultsReportDM } from './methods/generatePollResultsReportDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { sendPollResponseDM } from './methods/sendPollResponseDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface { // PollDomainInterface
	return {
		getPollData: getPollDataDM,

		createNewPoll: createNewPollDM,
		sendPollResponse: sendPollResponseDM,
		generatePollResultsReport: generatePollResultsReportDM,
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
