import { Chat } from '@domain/entities/chat/types'

function conversationsIsValidToSortUC(a: Chat, b: Chat) {
	return (!a || !b || (a && !Object.keys(a)) || (b && !Object.keys(b)))
}

export { conversationsIsValidToSortUC }
