/* eslint-disable no-unused-vars */
import { PostEntityOptional } from '@domain/post/entity/types'

import { PetitionEntity } from '../entity/types'

function structurePetitionDataDM(pollData: PetitionEntity): PostEntityOptional {
	const { petitionId, ...rest } = pollData // O id é gerado pelo firebase

	return {
		...rest,
		createdAt: new Date()
	}
}

export { structurePetitionDataDM }
