import { Chat } from '@globalTypes/chat/types'

import { UserStackParamList } from '../../Stack/UserStack/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: undefined
	ChatStack: { chat: Chat }
} & UserStackParamList
