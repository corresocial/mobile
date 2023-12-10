import { CheckBlockedUsersResponse } from '@domain/entities/chat'
import { Chat, ChatUserData, ChatUserIdentification, Message, MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { MutableObjectReference } from '@services/pushNotification/types'

interface ChatAdapterInterface {
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	getRemoteChatDataByUser(user1: ChatUserIdentification, user2: ChatUserIdentification): Promise<Chat>
	createNewUser(userId: Id): Promise<boolean>
	registerNewChat(chatData: Chat): Promise<void>
	setChatIdForUsers(userIds: Id[], chatId: Id): Promise<void>
	generateNewMessageObject(textMessage: string, userSenderId: Id): MessageObjects
	sendMessage(message: Message, chatId: Id, recipientUserId: Id): Promise<boolean>
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	blockUserById(targetBlockUserId: Id, ownerBlockUserId: Id): Promise<boolean>
	unblockUserById(targetBlockUserId: Id, ownerBlockUserId: Id): Promise<boolean>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[], chats: Chat[]) => void): Promise<void>
	startUserChatListeners(chatIds: Id[], callback: (chatId: Id, messages: MessageObjects) => void): Promise<void>
	startChatMessagesListener: (chatId: Id, callback: (newMessages: MessageObjects) => void) => void
	unsubscribeUserChatIdsListener: (userId: Id) => void
	unsubscribeUserChatsListener: (chatIds: Id[]) => void
	unsubscribeChatMessagesListener(chatId: Id): void
	updateUserTokenNotification(userId: Id, tokenNotification: string): Promise<void>
	hasBlockedUserOnConversation(userId1: Id, userId2: Id): Promise<CheckBlockedUsersResponse>

	registerPushNotification(): Promise<string>
	addNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
	removeNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void

	filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id): Message[]
	conversationsIsValidToSort(firstConversation: Chat, secondConversation: Chat): boolean
}

export { ChatAdapterInterface }
