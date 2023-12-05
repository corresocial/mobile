import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

import { InsertSocialImpactStartDateScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

function InsertSocialImpactStartDate({ route, navigation }: InsertSocialImpactStartDateScreenProps) {
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
			addNewUnsavedFieldToEditContext({ startDate: '' })
			navigation.goBack()
		}
	}

	const saveSocialImpactStartDate = (year: string, month: string, day: string) => {
		const startDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveSocialImpactStartDate}
			/>
		</>
	)
}

export { InsertSocialImpactStartDate }
