import { Chat, ChatUserData } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

export interface ChatGatewayAdapterInterface {
	registerNewUser(userId: Id, initialUserData: Partial<ChatUserData>): Promise<boolean> | boolean
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	existsOnDatabase(nodeId?: Id): Promise<boolean>
}
