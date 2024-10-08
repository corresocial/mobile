import { Chat, ChatUserData, ChatUserIdentification, Message, MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

interface ChatRepositoryInterface {
	existsOnDatabase(nodeId?: Id): Promise<boolean>
	getUserChatIds(userId: Id): Promise<Id[]> | Id[]
	getUserChats(chatIds: Id[]): Promise<Chat[]>
	getRemoteUserData(userId: Id): Promise<ChatUserData | null>
	getRemoteChatData(chatId: Id): Promise<Chat>
	registerNewUser(userId: Id, initialUserData: Partial<ChatUserData>): Promise<boolean> | boolean
	registerNewChat(initialChatData: Partial<Chat>): Promise<void>
	addNewUserChatId(userId: Id, chatId: Id): Promise<void>
	sendMessage(message: Message, chatId: Id): Promise<boolean>
	setChatMessages(chatId: Id, messages: MessageObjects): Promise<void>
	updateChatMessages(chatId: Id, messages: MessageObjects): Promise<void>
	updateBlockedUsersList(userId: Id, blockedUserIds: Id[]): Promise<boolean>
	updateUserChatProfilePicture(chatId: Id, chatUsers: { user1: ChatUserIdentification, user2: ChatUserIdentification }): Promise<void>
	updateChatCompletedState(chatId: Id, completedState: boolean): Promise<boolean>
	startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void): void
	startUserChatListener(userId: Id, callback: (chatId: Id, updatedChat: Chat) => void): void
	startChatMessagesListener(chatId: Id, callback: (newMessages: MessageObjects) => void): void
	unsubscribeUserChatIdsListener(userId: Id): void
	unsubscribeUserChatListener(chatId: Id): void
	unsubscribeChatMessagesListener(chatId: Id): void
	updateUserTokenNotification(userId: Id, tokenNotification: string, getRemoteUserData: (idUser: Id) => Promise<ChatUserData>): Promise<void>
}

export { ChatRepositoryInterface }
