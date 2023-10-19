import React from 'react'

export interface AlertProviderProps {
	children: React.ReactNode
}

export interface InitialNotificationStateType {
	notificationAlertModal: boolean
	configNotificationButton: boolean
	configNotificationEntryMethod: boolean
}

export interface AlertContextProps {
	notificationState: InitialNotificationStateType
	updateNotificationState: (newState: InitialNotificationStateType | { [x: string]: boolean }) => void
	showAlertNotificationModal: () => void
}
