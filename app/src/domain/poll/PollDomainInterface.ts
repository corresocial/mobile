import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity } from './entity/types'

interface PollDomainInterface {
	getPollData: (usePollRepository: () => PollRepositoryInterface, pollId: string) => Promise<PollEntity | undefined>

	createNewPoll: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<void> | undefined
	sendPollResponse: (
		usePollRepository: () => PollRepositoryInterface,
		pollId: string,
		responseData: PollEntity['privateResponses']) => Promise<void>
	generatePollResultsReport: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<string>
	generateIndividualPollResponsesReport: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<string>
}

export { PollDomainInterface }
