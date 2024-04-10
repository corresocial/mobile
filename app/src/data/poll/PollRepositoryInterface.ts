import { PollEntity, PollEntityOptional } from '@domain/poll/entity/types'

interface PollRepositoryInterface {
	getPollDataById: (pollId: string) => Promise<PollEntity | undefined>

	createPoll: (pollData: PollEntityOptional) => Promise<void>
	createPollResponse: (pollId: string, data: PollEntity['privateResponses']) => Promise<void>
}

export { PollRepositoryInterface }
