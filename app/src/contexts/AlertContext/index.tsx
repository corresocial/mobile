import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AlertNotificationModal } from '../../components/_modals/AlertNotificationModal'
import { AlertContextProps, AlertProviderProps, InitialNotificationStateType } from './types'
import { NewHomePresentationModal } from '../../components/_modals/NewHomePresentationModal'

const initialNotificationState = { // private
	notificationAlertModal: true,
	newHomePresentationModal: true,

	configNotificationButton: true,
	configNotificationEntryMethod: true
}

const initialValue: AlertContextProps = {
	notificationState: initialNotificationState,
	updateNotificationState: (newState: InitialNotificationStateType | { [x: string]: boolean }) => { },
	showAlertNotificationModal: () => { },
	showNewHomePresentationModal: () => { }
}

const AlertContext = createContext<AlertContextProps>(initialValue)

function AlertProvider({ children }: AlertProviderProps) {
	const [notificationState, setNotificationState] = useState(initialNotificationState)
	const [alertNotificationModalIsVisible, setAlertNotificationIsVisible] = useState(false)

	const [newHomePresentationModalIsVisible, setNewHomePresentationIsVisible] = useState(false)

	useEffect(() => {
		// AsyncStorage.removeItem('corre.alert')
		loadAlertLocalData()
	}, [])

	const loadAlertLocalData = async () => {
		const localAlertData = await AsyncStorage.getItem('corre.alert')
		if (localAlertData) {
			console.log('has local data')
			console.log(localAlertData)
			setNotificationState(JSON.parse(localAlertData))
		} else {
			console.log('not has local data')
			await setAlertLocalDataStructure()
		}
	}

	const setAlertLocalDataStructure = async () => {
		await updateLocalAlertData(initialNotificationState)
		setNotificationState(initialNotificationState)
	}

	const updateLocalAlertData = async (data: Partial<InitialNotificationStateType>) => {
		await AsyncStorage.setItem('corre.alert', JSON.stringify(data))
	}

	const showAlertNotificationModal = useCallback(() => {
		if (notificationState.notificationAlertModal) setAlertNotificationIsVisible(true)
	}, [notificationState])

	const showNewHomePresentationModal = useCallback(() => {
		if (notificationState.newHomePresentationModal) setNewHomePresentationIsVisible(true)
	}, [notificationState])

	const updateNotificationState = async (state: Partial<InitialNotificationStateType>) => {
		setAlertNotificationIsVisible(false)
		setNotificationState({ ...notificationState, ...state })
		updateLocalAlertData({ ...notificationState, ...state })
	}

	const alertDataProvider = useMemo(() => ({
		notificationState,
		updateNotificationState,
		showAlertNotificationModal,
		showNewHomePresentationModal
	}), [notificationState])

	return (
		<AlertContext.Provider value={alertDataProvider}>
			<AlertNotificationModal
				visibility={alertNotificationModalIsVisible}
				onPressButton={() => {
					setAlertNotificationIsVisible(false)
					updateNotificationState({ notificationAlertModal: false })
				}}
			/>
			<NewHomePresentationModal
				visibility={newHomePresentationModalIsVisible}
				onPressButton={() => {
					setNewHomePresentationIsVisible(false)
					updateNotificationState({ newHomePresentationModal: false })
				}}
			/>
			{children}
		</AlertContext.Provider>
	)
}

export { AlertProvider, AlertContext }
