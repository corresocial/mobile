import React from 'react'

export interface AlertProviderProps {
	children: React.ReactNode
}

export interface InitialNotificationStateType {
	notificationAlert: boolean
}

export interface AlertContextProps {
	showAlertNotificationModal: () => void
}
