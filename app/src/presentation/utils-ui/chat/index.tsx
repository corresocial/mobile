import { Message, MessageObjects } from '@globalTypes/chat/types'

const defaultMessageObject = { // rule
	message: '',
	dateTime: Date.now(),
	readed: true,
	owner: 'any',
}

const getLastMessageObjects = (messages: MessageObjects | Message[]) => {
	if (!messages) return defaultMessageObject
	if (Array.isArray(messages)) return messages[messages.length - 1]

	if (typeof (messages) === 'object') {
		const keys = Object.keys(messages)
		const lastMessageId: any = keys[keys.length - 1]
		return messages[lastMessageId]
	}

	return defaultMessageObject
}

const sortChatMessages = (a: Message, b: Message) => {
	if (a.dateTime < b.dateTime) return -1
	if (a.dateTime > b.dateTime) return 1
	return 0
}

export {
	defaultMessageObject,
	getLastMessageObjects,
	sortChatMessages
}
