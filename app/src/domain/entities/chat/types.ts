export type Chat = Conversation[]

export type Conversation = {
	chatId: string
	user1: {
		userId: string
		name: string
		profilePictureUrl: string
		privateMessages?: MessageObjects
	}
	user2: {
		userId: string
		name: string
		profilePictureUrl: string
		privateMessages?: MessageObjects
	}
	messages: MessageObjects
}

export type Message = {
	message: string
	dateTime: Date | number
	readed: boolean
	owner: string
	justOwner?: boolean
	userCanView?: string
}

export type MessageObjects = {
	[id: string]: {
		message: string
		dateTime: Date | number
		readed: boolean
		owner: string
		justOwner?: boolean
		userCanView?: string
	}
}

export type UserDatabase = {
	blockedUsers: string[]
	chatIds: string[]
	tokenNotifications?: string
}

export type ChatUserIdentification = {
	userId: string
	name: string
	profilePictureUrl: string
}
