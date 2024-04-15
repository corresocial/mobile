import { createNewPollDM } from './methods/createNewPollDM'
import { generateIndividualPollResponsesReportDM } from './methods/generateIndividualPollResponsesReportDM'
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
		generateIndividualPollResponsesReport: generateIndividualPollResponsesReportDM,
		// registerUserOnPollResponseList

		// deletePoll
	}
}

export { usePollDomain }
