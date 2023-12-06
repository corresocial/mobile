import { Conversation } from "@domain/entities/chat/types"

function conversationsIsValidToSortUC(a: Conversation, b: Conversation) {
	return (!a || !b || (a && !Object.keys(a)) || (b && !Object.keys(b)))
}

export { conversationsIsValidToSortUC }
