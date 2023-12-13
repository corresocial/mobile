import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

function updateMessagesCanViewedByUser(messages: MessageObjects, userIdCanView: Id): MessageObjects[] { // TODO rule
	const updatedMessages = Object.entries(messages).map((message) => {
		if (!message[1].userCanView) {
			return { [message[0]]: { ...message[1], userCanView: userIdCanView } }
		}
		if (message[1].userCanView !== userIdCanView) {
			return false
		}
		return message
	})

	return updatedMessages as MessageObjects[]
}

export { updateMessagesCanViewedByUser }
