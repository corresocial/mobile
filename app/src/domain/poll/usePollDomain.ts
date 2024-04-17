import { createNewPollDM } from './methods/createNewPollDM'
import { deletePollDataDM } from './methods/deletePollDataDM'
import { generateIndividualPollResponsesReportDM } from './methods/generateIndividualPollResponsesReportDM'
import { generatePollResultsReportDM } from './methods/generatePollResultsReportDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { markPollAsCompletedDM } from './methods/markPollAsCompletedDM'
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
		markPollAsCompleted: markPollAsCompletedDM,

		deletePollData: deletePollDataDM
	}
}

export { usePollDomain }
