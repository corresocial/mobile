import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'

import { UserStackNavigationProps } from '../../presentation/routes/Stack/UserStack/types'
import { AlertContextProps, AlertProviderProps, InitialNotificationStateType } from './types'

import { AlertNotificationModal } from '../../presentation/components/_modals/AlertNotificationModal'
import { NewHomePresentationModal } from '../../presentation/components/_modals/NewHomePresentationModal'

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

	const navigation = useNavigation<UserStackNavigationProps>()

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

	const handlerAlertNotificationModal = () => {
		setAlertNotificationIsVisible(false)
		updateNotificationState({ notificationAlertModal: false, configNotificationButton: false })
		navigation.navigate('Configurations')
		navigation.navigate('NotificationSettings')
	}

	const handleNewHomePresentationModal = () => {
		setNewHomePresentationIsVisible(false)
		updateNotificationState({ newHomePresentationModal: false })
	}

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
				onPressButton={handlerAlertNotificationModal}
			/>
			<NewHomePresentationModal
				visibility={newHomePresentationModalIsVisible}
				onPressButton={handleNewHomePresentationModal}
			/>
			{children}
		</AlertContext.Provider>
	)
}

export { AlertProvider, AlertContext }
