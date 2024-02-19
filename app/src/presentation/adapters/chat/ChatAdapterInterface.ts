import { CheckBlockedUsersResponse } from '@domain/entities/chat'
import { Chat, ChatUserData, ChatUserIdentification, Message, MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapterInterface as ChatRepositoryAdapterInterface } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapterInterface'

import { MutableObjectReference } from '@services/pushNotification/types'

interface ChatAdapterInterface {
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData>
	getRemoteChatDataByUser(user1: ChatUserIdentification, user2: ChatUserIdentification): Promise<Chat>
	createNewUser(userId: Id): Promise<boolean>
	registerNewChat(chatData: Chat): Promise<void>
	setChatIdForUsers(userIds: Id[], chatId: Id): Promise<void>
	generateNewMessageObject(textMessage: string, userSenderId: Id): MessageObjects
	sendMessage(message: Message, chatId: Id, recipientUserName: string): Promise<boolean>
	cleanChatMessages(chatId: Id, recipientUserId: Id): Promise<void>
	makeAllUserMessagesAsRead(chatId: Id, userId: Id): Promise<void>
	updateProfilePictureOnConversations(chatId: Id, profilePictureUrl: string): Promise<void>
	blockUserById(targetBlockUserId: Id, ownerBlockUserId: Id): Promise<boolean>
	unblockUserById(targetBlockUserId: Id, ownerBlockUserId: Id): Promise<boolean>
	updateChatCompletedState(chatId: Id, currentCompletedState?: boolean, recipientUserId?: Id, senderUserName?: string): Promise<void>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[], chats: Chat[]) => void): Promise<void>
	startUserChatListeners(chatIds: Id[], callback: (chatId: Id, updatedChat: Chat) => void): Promise<void>
	startChatMessagesListener: (chatId: Id, callback: (newMessages: MessageObjects) => void) => void
	unsubscribeUserChatIdsListener: (userId: Id) => void
	unsubscribeUserChatsListener: (chatIds: Id[]) => void
	unsubscribeChatMessagesListener(chatId: Id): void
	chatUserHasTokenNotification(userId: Id, ChatRepositoryAdapter: () => ChatRepositoryAdapterInterface): Promise<boolean>
	updateUserTokenNotification(userId: Id, tokenNotification: string): Promise<void>
	hasBlockedUserOnConversation(userId1: Id, userId2: Id): Promise<CheckBlockedUsersResponse>

	registerPushNotification(): Promise<string>
	addNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
	removeNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void

	filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id): Message[]
	conversationsIsValidToSort(firstConversation: Chat, secondConversation: Chat): boolean
}

export { ChatAdapterInterface }
