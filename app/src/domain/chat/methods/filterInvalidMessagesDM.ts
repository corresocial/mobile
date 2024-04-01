import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { filterInvalidMessages } from '../core/filters'

function filterInvalidMessagesDM(messages: MessageObjects, authenticatedUserId: Id) {
	return filterInvalidMessages(messages, authenticatedUserId)
}

export { filterInvalidMessagesDM }
