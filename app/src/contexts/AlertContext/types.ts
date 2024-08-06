import React from 'react'

export interface AlertModalContent {
	visibility?: boolean
	title?: string
	type?: 'info' | 'warn' | 'error'
	text: string
	handleSuccessMethod?: any
	handleAlternativeMethod?: any
}

export interface AlertProviderProps {
	children: React.ReactNode
}

export interface InitialNotificationStateType {
	notificationAlertModal: boolean
	eventCalendarPresentation: boolean
	configNotificationButton: boolean
	configNotificationEntryMethod: boolean
}

export interface AlertContextProps {
	notificationState: InitialNotificationStateType
	updateNotificationState: (newState: InitialNotificationStateType | { [x: string]: boolean }) => void
	showAlertNotificationModal: () => void
	showDefaultAlertModal: (modalContent: AlertModalContent) => void
	showEventCalendarPresentationModal: () => void
	showWaitingApproveModal: () => void
}
