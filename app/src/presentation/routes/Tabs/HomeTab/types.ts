import { Chat } from '@domain/entities/chat/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: undefined
	ChatStack: { chat: Chat }
}
