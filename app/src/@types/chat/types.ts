export type Chat = {
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
}

export type UserIdentification = {
	userId: string
	name: string
	profilePictureUrl: string
}
