import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertServiceEndHourScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTime } from '../../../components/_onboarding/PostTime'

function InsertServiceEndHour({ route, navigation }: InsertServiceEndHourScreenProps) {
	const { serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (Platform.OS === 'android') removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: '' })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ endHour: '' as any })
		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditServicePostReview',
				params: {
					postData: { ...serviceDataContext, endHour: '' },
					unsavedPost: true
				}
			}]
		})
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const endHour = new Date()
		endHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ endHour })

		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditServicePostReview',
				params: {
					postData: { ...serviceDataContext, endHour },
					unsavedPost: true
				}
			}]
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'que horas você termina?'}
				customHighlight={['que', 'horas', 'termina']}
				startTime={editDataContext.unsaved.startHour || serviceDataContext.startHour}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertServiceEndHour }
