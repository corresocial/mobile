/* eslint-disable no-unused-vars */
import { PostEntityOptional } from '@domain/post/entity/types'

import { PollEntity } from '../entity/types'

function structurePollDataDM(pollData: PollEntity): PostEntityOptional {
	const { pollId, ...rest } = pollData // O id é gerado pelo firebase

	return {
		...rest,
		completed: false,
		createdAt: new Date()
	}
}

export { structurePollDataDM }
