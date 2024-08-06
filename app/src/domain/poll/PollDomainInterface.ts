import { UserOwner } from '@domain/user/entity/types'

import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity, PrivatePollResponse } from './entity/types'

interface PollDomainInterface {
	getPollData: (usePollRepository: () => PollRepositoryInterface, pollId: string) => Promise<PollEntity | undefined>
	getPollsByOwner(usePollRepository: () => PollRepositoryInterface, userId: string, pageSize?: number, lastPoll?: PollEntity): Promise<PollEntity[]> | PollEntity[]

	createNewPoll: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<void> | undefined
	sendPollResponse: (
		usePollRepository: () => PollRepositoryInterface,
		pollId: string,
		responseData: PrivatePollResponse) => Promise<void>
	generatePollResultsReport: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<string>
	generateIndividualPollResponsesReport: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<string>

	markPollAsCompleted: (usePollRepository: () => PollRepositoryInterface, pollId: string, currentCompletedState: boolean) => Promise<void>
	updateOwnerDataOnPolls: (usePollRepository: () => PollRepositoryInterface, ownerPost: Partial<UserOwner>) => Promise<boolean | void>

	deletePollData: (usePollRepository: () => PollRepositoryInterface, pollId: string) => Promise<void>
}

export { PollDomainInterface }
