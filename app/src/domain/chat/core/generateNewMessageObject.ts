import { Id } from '@domain/globalTypes'

function newMessageObject(localMessageId: Id, textMessage: string, userSenderId: Id) {
	return {
		[localMessageId]: {
			message: textMessage,
			dateTime: Date.now(),
			readed: false,
			owner: userSenderId,
		},
	}
}

export { newMessageObject }
