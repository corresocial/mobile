import { Message, MessageObjects } from '../../@types/chat/types'

const defaultMessageObject = {
	message: '',
	dateTime: Date.now(),
	readed: true,
	owner: 'any',
}

const getLastMessageObjects = (messages: MessageObjects | Message[]) => {
	if (!messages) {
		return defaultMessageObject
	}

	if (Array.isArray(messages)) {
		console.log('array')
		return messages[messages.length - 1]
	}

	if (typeof (messages) === 'object') {
		console.log('Object')
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
