import { ReactNode } from 'react'

import { Chat } from '@domain/entities/chat/types'

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
