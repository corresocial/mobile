import { Message, MessageObjects } from '../../@types/chat/types'

const defaultMessageObject = {
	message: '',
	dateTime: Date.now(),
	readed: true,
	owner: 'any',
}

const getLastMessageObjects = (messages: MessageObjects) => {
	if (!messages) {
		return defaultMessageObject
	}

	const keys = Object.keys(messages)
	const lastMessageId: any = keys[keys.length - 1] // TODO Type
	return messages[lastMessageId]
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
