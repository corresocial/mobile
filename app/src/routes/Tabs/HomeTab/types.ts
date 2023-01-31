import { UserStackParamList } from '../../Stack/UserStack/types'

export type HomeTabParamList = {
	Home: undefined
	Post: undefined
	ProfileStack: { teste?: string }
} & UserStackParamList
