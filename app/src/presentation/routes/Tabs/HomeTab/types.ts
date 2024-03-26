import { Chat } from '@domain/chat/entity/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: undefined
	ChatStack: { chat: Chat }
}
