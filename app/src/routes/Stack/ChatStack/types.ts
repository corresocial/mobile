import { Chat } from '../../../@types/chat/types'
import { UserStackParamList } from '../UserStack/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	ChatMessages: { chat: Chat }
} & UserStackParamList
