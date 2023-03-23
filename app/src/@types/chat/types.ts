export type Chat = {
	chatId: string
	userId1: string
	userId2: string
	messages: MessageObjects
}

export type Message = {
	message: string
	dateTime: Date | number
	readed: boolean
	owner: string
}

export type MessageObjects = {
	[id: string]: {
		message: string
		dateTime: Date | number
		readed: boolean
		owner: string
	}
}
