import { UserStackParamList } from '../../Stack/UserStack/types'

export type HomeTabParamList = {
	HomeStack: undefined
	Post: undefined
	ProfileStack: { teste?: string }
} & UserStackParamList
