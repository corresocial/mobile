import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

function updateMessagesCanViewedByUser(messages: MessageObjects, userIdCanView: Id): MessageObjects[] {
	const updatedMessages = Object.entries(messages).map((message) => {
		if (!message[1].userCanView) {
			return { [message[0]]: { ...message[1], userCanView: userIdCanView } }
		}
		if (message[1].userCanView !== userIdCanView) {
			return false
		}

		return { [message[0]]: { ...message[1] } }
	})

	return updatedMessages as MessageObjects[]
}

export { updateMessagesCanViewedByUser }
