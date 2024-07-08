import { createNewPollDM } from './methods/createNewPollDM'
import { deletePollDataDM } from './methods/deletePollDataDM'
import { generateIndividualPollResponsesReportDM } from './methods/generateIndividualPollResponsesReportDM'
import { generatePollResultsReportDM } from './methods/generatePollResultsReportDM'
import { getPollDataDM } from './methods/getPollDataDM'
import { getPollsByOwnerDM } from './methods/getPollsByOwnerDM'
import { markPollAsCompletedDM } from './methods/markPollAsCompletedDM'
import { sendPollResponseDM } from './methods/sendPollResponseDM'
import { updateOwnerDataOnPollsDM } from './methods/updateOwnerDataOnPollsDM'
import { PollDomainInterface } from './PollDomainInterface'

function usePollDomain(): PollDomainInterface {
	return {
		getPollData: getPollDataDM,
		getPollsByOwner: getPollsByOwnerDM,

		createNewPoll: createNewPollDM,
		sendPollResponse: sendPollResponseDM,
		generatePollResultsReport: generatePollResultsReportDM,
		generateIndividualPollResponsesReport: generateIndividualPollResponsesReportDM,

		markPollAsCompleted: markPollAsCompletedDM,
		updateOwnerDataOnPolls: updateOwnerDataOnPollsDM,

		deletePollData: deletePollDataDM
	}
}

export { usePollDomain }
