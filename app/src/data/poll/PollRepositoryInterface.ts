import { PollEntity } from '@domain/poll/entity/types'

interface PollRepositoryInterface {
	createPoll: (pollData: PollEntity) => Promise<void>
}

export { PollRepositoryInterface }
