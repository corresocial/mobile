import { Chat } from '@domain/chat/entity/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: undefined
	LeaderAreaStack: undefined
	ChatStack: { chat: Chat }
}
