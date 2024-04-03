import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity } from './entity/types'

interface PollDomainInterface {
	createNewPoll: (usePollRepository: () => PollRepositoryInterface, pollData: PollEntity) => Promise<void> | undefined
	getPollData: (usePollRepository: () => PollRepositoryInterface, pollId: string) => Promise<PollEntity | undefined> | undefined
}

export { PollDomainInterface }
