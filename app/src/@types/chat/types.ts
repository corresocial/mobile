export type Chat = {
	chatId: number
	userId1: string
	userId2: string
	messages: {
		message: string
		dateTime: Date
		readed: boolean
		owner: string
	}[]
}

export type Message = {
	message: string;
	dateTime: Date;
	readed: boolean;
	owner: string;
}
