import { Chat } from '@domain/chat/entity/types'

export type HomeTabParamList = {
	HomeStack: undefined | { scrollToTop?(): void }
	Post: undefined
	ProfileStack: undefined
	LeaderAreaStack: undefined
	ChatStack: { chat: Chat }
}
