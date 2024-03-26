import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { filterInvalidMessages } from '../core/filters'

function filterInvalidMessagesUC(messages: MessageObjects, authenticatedUserId: Id) {
	return filterInvalidMessages(messages, authenticatedUserId)
}

export { filterInvalidMessagesUC }
