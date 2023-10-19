import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AlertNotificationModal } from '../../components/_modals/AlertNotificationModal'
import { AlertContextProps, AlertProviderProps, InitialNotificationStateType } from './types'

const initialNotificationState = { // private
	notificationAlertModal: true,

	configNotificationButton: true,
	configNotificationEntryMethod: true
}

const initialValue: AlertContextProps = {
	notificationState: initialNotificationState,
	updateNotificationState: (newState: InitialNotificationStateType | { [x: string]: boolean }) => { },
	showAlertNotificationModal: () => { },
}

const AlertContext = createContext<AlertContextProps>(initialValue)

function AlertProvider({ children }: AlertProviderProps) {
	const [notificationState, setNotificationState] = useState(initialNotificationState)
	const [alertNotificationModalIsVisible, setAlertNotificationIsVisible] = useState(false)

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
		console.log(notificationState)
		if (notificationState.notificationAlertModal) setAlertNotificationIsVisible(true)
	}, [notificationState])

	const updateNotificationState = async (state: Partial<InitialNotificationStateType>) => {
		setAlertNotificationIsVisible(false)
		setNotificationState({ ...notificationState, ...state })
		updateLocalAlertData({ ...notificationState, ...state })
	}

	const alertDataProvider = useMemo(() => ({
		notificationState,
		updateNotificationState,
		showAlertNotificationModal
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
			{children}
		</AlertContext.Provider>
	)
}

export { AlertProvider, AlertContext }
