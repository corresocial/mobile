import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactStartHourScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTime } from '../../../components/_onboarding/PostTime'

function InsertSocialImpactStartHour({ route, navigation }: InsertSocialImpactStartHourScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

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
			addNewUnsavedFieldToEditContext({ startHour: '' })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ startHour: '' as any })
		navigation.navigate('InsertSocialImpactEndDate')
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const startHour = new Date()
		startHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startHour })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ startHour })
		navigation.navigate('InsertSocialImpactEndDate')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[4, 4]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertSocialImpactStartHour }
