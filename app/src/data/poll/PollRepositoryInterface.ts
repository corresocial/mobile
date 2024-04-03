import { PollEntity, PollEntityOptional } from '@domain/poll/entity/types'

interface PollRepositoryInterface {
	createPoll: (pollData: PollEntityOptional) => Promise<void>
	getPollDataById: (pollId: string) => Promise<PollEntity | undefined>
}

export { PollRepositoryInterface }
