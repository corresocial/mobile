import { Conversation, Message, MessageObjects, UserDatabase } from "@domain/entities/chat/types"
import { Id } from "@services/firebase/types"

interface ChatAdapterInterface {
	createNewUser(userId: Id): Promise<boolean>
	filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id): Message[]
	conversationsIsValidToSort(firstConversation: Conversation, secondConversation: Conversation): boolean
}

export { ChatAdapterInterface }
