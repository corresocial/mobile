import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'

import { useUtils } from '@newutils/useUtils'

import { UserStackNavigationProps } from '../../presentation/routes/Stack/UserStack/types'
import { AlertContextProps, AlertModalContent, AlertProviderProps, InitialNotificationStateType } from './types'

import { AlertNotificationModal } from '@components/_modals/AlertNotificationModal'
import { DefaultAlertModal } from '@components/_modals/DefaultAlertModal'
import { NewHomePresentationModal } from '@components/_modals/NewHomePresentationModal'

const { objectValuesAreEquals } = useUtils()

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

	const loadAlertLocalData = useCallback(async () => {
		const localAlertData = await AsyncStorage.getItem('corre.alert')
		if (localAlertData) {
			const localAlertDataObject = JSON.parse(localAlertData)
			const newLocalAlertData = { ...initialNotificationState, ...localAlertDataObject }
			updateLocalAlertData(localAlertDataObject)
			setNotificationState(newLocalAlertData)
		} else {
			await setAlertLocalDataStructure()
		}
	}, [])

	const setAlertLocalDataStructure = useCallback(async () => {
		await updateLocalAlertData(initialNotificationState)
		setNotificationState(initialNotificationState)
	}, [])

	const updateLocalAlertData = useCallback(async (data: InitialNotificationStateType) => {
		await AsyncStorage.setItem('corre.alert', JSON.stringify(data))
	}, [])

	const showAlertNotificationModal = useCallback(() => {
		if (notificationState.notificationAlertModal) setAlertNotificationIsVisible(true)
	}, [notificationState])

	const showNewHomePresentationModal = useCallback(() => {
		if (notificationState.newHomePresentationModal) setNewHomePresentationIsVisible(true)
	}, [notificationState])

	const [defaultAlertModalContent, setDefaultAlertModalContent] = useState({} as AlertModalContent)

	const showAlertModal = async (modalContent: AlertModalContent) => {
		// TODO Definir métodos
	}

	const closeContextModal = () => setDefaultAlertModalContent({ ...defaultAlertModalContent, visibility: false })

	const handlerAlertNotificationModal = useCallback(() => {
		setAlertNotificationIsVisible(false)
		updateNotificationState({ notificationAlertModal: false, configNotificationButton: false })
		navigation.navigate('Configurations' as any)
		navigation.navigate('NotificationSettings' as any)
	}, [])

	const handleNewHomePresentationModal = useCallback(() => {
		setNewHomePresentationIsVisible(false)
		updateNotificationState({ newHomePresentationModal: false })
	}, [])

	const updateNotificationState = useCallback(async (state: Partial<InitialNotificationStateType>) => {
		if (objectValuesAreEquals(notificationState, state)) return // REFACTOR Otimização de contexto

		setAlertNotificationIsVisible(false)
		setNotificationState({ ...notificationState, ...state })
		updateLocalAlertData({ ...notificationState, ...state })
	}, [notificationState])

	const alertDataProvider = useMemo(() => ({
		notificationState,
		updateNotificationState,
		showAlertNotificationModal,
		showNewHomePresentationModal,
		showAlertModal
	}), [defaultAlertModalContent, notificationState])

	return (
		<AlertContext.Provider value={alertDataProvider}>
			<DefaultAlertModal
				data={defaultAlertModalContent}
				closeModal={closeContextModal}
			/>
			<AlertNotificationModal
				visibility={alertNotificationModalIsVisible}
				closeModal={() => setAlertNotificationIsVisible(false)}
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
