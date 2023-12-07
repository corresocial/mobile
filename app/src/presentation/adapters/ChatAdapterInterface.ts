import { Chat, ChatUserData, Message, MessageObjects } from '@domain/entities/chat/types'

import { Id } from '@services/firebase/types'

interface ChatAdapterInterface {
	createNewUser(userId: Id): Promise<boolean>
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[], chats: Chat[]) => void): Promise<void>
	filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id): Message[]
	conversationsIsValidToSort(firstConversation: Chat, secondConversation: Chat): boolean
}

export { ChatAdapterInterface }
