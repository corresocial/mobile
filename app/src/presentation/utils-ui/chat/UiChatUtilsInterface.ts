import { Message, MessageObjects } from '../../../types/chat/types'

export interface UiChatUtilsInterface {
	defaultMessageObject: Message
	getLastMessageObjects(messages: MessageObjects | Message[]): Message
	sortChatMessages(a: Message, b: Message): number
}
