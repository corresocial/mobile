import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AlertNotificationModal } from '../../components/_modals/AlertNotificationModal'
import { AlertContextProps, AlertProviderProps, InitialNotificationStateType } from './types'

const initialNotificationState = { // private
	notificationAlert: true,
}

const initialValue: AlertContextProps = {
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
		if (notificationState.notificationAlert) setAlertNotificationIsVisible(true)
	}, [notificationState])

	const handleAlertNotification = async () => {
		setAlertNotificationIsVisible(false)
		setNotificationState({ ...notificationState, notificationAlert: false })
		updateLocalAlertData({ ...notificationState, notificationAlert: false })
	}

	const alertDataProvider = useMemo(() => ({
		showAlertNotificationModal
	}), [notificationState])

	return (
		<AlertContext.Provider value={alertDataProvider}>
			<AlertNotificationModal
				visibility={alertNotificationModalIsVisible}
				onPressButton={handleAlertNotification}
			/>
			{children}
		</AlertContext.Provider>
	)
}

export { AlertProvider, AlertContext }
