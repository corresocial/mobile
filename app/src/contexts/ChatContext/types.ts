import { ReactNode } from 'react'

import { Chat } from '@domain/chat/entity/types'

export interface ChatProviderProps {
	children: ReactNode
}

export type ChatContextType = {
	chatDataContext: Chat[]
	pushNotificationEnabled: boolean
	setPushNotificationState: (state: boolean) => Promise<void>
	chatUserHasTokenNotification: () => Promise<boolean>
	removeChatListeners: () => void
}
