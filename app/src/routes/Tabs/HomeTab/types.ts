import { UserStackParamList } from '../../Stack/UserStack/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	Chat: undefined
	ProfileStack: { teste?: string }
} & UserStackParamList
