import { PollRepositoryInterface } from '@data/poll/PollRepositoryInterface'

import { PollEntity } from '../entity/types'

export function getPollsByOwnerDM(usePollRepository: () => PollRepositoryInterface, userId: string, pageSize?: number, lastPoll?: PollEntity) {
	try {
		const { getPollsByUser } = usePollRepository()

		return getPollsByUser(userId, pageSize, lastPoll)
	} catch (error) {
		console.log(error)
		return [] as PollEntity[]
	}
}
