import { Chat, ChatUserData, MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

export interface ChatGatewayAdapterInterface {
	registerNewUser(userId: Id, initialUserData: Partial<ChatUserData>): Promise<boolean> | boolean
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void): void
	startUserChatListener(userId: Id, callback: (chatId: Id, messages: MessageObjects) => void): void
	unsubscribeUserChatIdsListener(userId: Id): void
	unsubscribeUserChatListener(chatId: Id): void
	updateUserTokenNotification(userId: Id, tokenNotification: string, getRemoteUserData: (idUser: Id) => Promise<ChatUserData>): Promise<void>
}
