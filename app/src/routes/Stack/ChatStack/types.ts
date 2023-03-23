import { Chat } from '../../../@types/chat/types'
import { UserStackParamList } from '../UserStack/types'

export type ChatStackParamList = {
	ChatConversations: undefined
	Chat: { chat: Chat }
} & UserStackParamList
