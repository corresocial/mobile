import { Id } from '../../globalTypes'

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

export type Chat = {
	chatId: string
	completed?: boolean
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
	metadata?: { title: string }
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
	blockedUsers: Id[]
	chatIds: Id[]
	tokenNotification?: string
}

export type ChatUserData = {
	blockedUsers: Id[]
	chatIds: Id[]
	tokenNotification?: string
}

export type ChatUserIdentification = {
	userId: Id
	name: string
	profilePictureUrl: string
}
