import { CheckBlockedUsersResponse } from '@domain/entities/chat'
import { Chat, ChatUserData, Message, MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { MutableObjectReference } from '@services/pushNotification/types'

interface ChatAdapterInterface {
	createNewUser(userId: Id): Promise<boolean>
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[], chats: Chat[]) => void): Promise<void>
	startUserChatListeners(chatIds: Id[], callback: (chatId: Id, messages: MessageObjects) => void): Promise<void>
	unsubscribeUserChatIdsListener: (userId: Id) => void
	unsubscribeUserChatsListener: (chatIds: Id[]) => void
	updateUserTokenNotification(userId: Id, tokenNotification: string): Promise<void>
	hasBlockedUserOnConversation(userId1: Id, userId2: Id): Promise<CheckBlockedUsersResponse>

	registerPushNotification(): Promise<string>
	addNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
	removeNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void

	filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id): Message[]
	conversationsIsValidToSort(firstConversation: Chat, secondConversation: Chat): boolean
}

export { ChatAdapterInterface }
