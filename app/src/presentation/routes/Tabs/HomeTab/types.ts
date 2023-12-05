import { UserStackParamList } from '../../Stack/UserStack/types'
import { Chat } from '@globalTypes/chat/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: undefined
	ChatStack: { chat: Chat }
} & UserStackParamList
