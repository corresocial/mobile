import { PollEntity, PollEntityOptional, PrivatePollResponse } from '@domain/poll/entity/types'
import { UserOwner } from '@domain/user/entity/types'

interface PollRepositoryInterface {
	getPollDataById: (pollId: string) => Promise<PollEntity | undefined>
	getPrivateResponses: (pollId: string) => Promise<PollEntity['privateResponses']>
	getPollsByUser: (userId: string, maxDocs?: number, lastDoc?: any) => Promise<PollEntity[]>
	getPollIdsByUser: (userId: string) => Promise<string[]>

	createPoll: (pollData: PollEntityOptional) => Promise<void>
	createPollResponse: (pollId: string, data: PrivatePollResponse) => Promise<void>

	updatePoll: (pollId: string, data: PollEntityOptional, fieldName?: keyof PollEntityOptional) => Promise<void>
	updatePollArrayField: (pollId: string, data: any, fieldName: keyof PollEntityOptional) => Promise<void>
	updateOwnerDataOnPolls: (ownerPost: Partial<UserOwner>, userPostIds: string[]) => Promise<boolean>

	deletePoll: (pollId: string) => Promise<void>
}

export { PollRepositoryInterface }
