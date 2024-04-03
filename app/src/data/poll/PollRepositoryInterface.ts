import { PostEntityOptional } from '@domain/post/entity/types'

interface PollRepositoryInterface {
	createPoll: (pollData: PostEntityOptional) => Promise<void>
}

export { PollRepositoryInterface }
