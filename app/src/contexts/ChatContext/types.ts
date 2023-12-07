import React from 'react'

import { Chat } from '@domain/entities/chat/types'

export interface ChatProviderProps {
	children: React.ReactNode
}

export type ChatContextType = {
	chatDataContext: Chat[]
	pushNotificationEnabled: boolean
	setPushNotificationState: (state: boolean) => Promise<void>
	userHasTokenNotification: () => Promise<boolean>
	removeChatListeners: () => void
}
