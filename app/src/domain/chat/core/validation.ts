import { Chat } from '@domain/chat/entity/types'

function conversationsIsValidToSortUC(a: Chat, b: Chat) {
	return (!a || !b || (a && !Object.keys(a)) || (b && !Object.keys(b)))
}

export { conversationsIsValidToSortUC }
