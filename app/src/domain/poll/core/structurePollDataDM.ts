/* eslint-disable no-unused-vars */
import { PollEntity } from '../entity/types'

function structurePollDataDM(pollData: PollEntity) {
	const { pollId, ...rest } = pollData // O id é gerado pelo firebase
	return {
		...rest,
		createdAt: new Date()
	}
}

export { structurePollDataDM }
