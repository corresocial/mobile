import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { filterInvalidMessages } from '../rules/filters'

function filterInvalidMessagesUC(messages: MessageObjects, authenticatedUserId: Id) {
	return filterInvalidMessages(messages, authenticatedUserId)
}

export { filterInvalidMessagesUC }
