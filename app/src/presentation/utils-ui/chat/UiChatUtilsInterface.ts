import { ChatUserIdentification, Message, MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

export interface UiChatUtilsInterface {
	defaultMessageObject: Message
	getLastMessageObject(messages: MessageObjects | Message[]): Message
	getConversationUserName(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification): string
	getConversationUserId(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification): string
	getConversationProfilePicture(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification): string
	sortChatMessages(a: Message, b: Message): number
}
