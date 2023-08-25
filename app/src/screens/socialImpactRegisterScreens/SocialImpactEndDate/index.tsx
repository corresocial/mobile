import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar, Platform } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactEndDateScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'
import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertSocialImpactEndDate({ route, navigation }: InsertSocialImpactEndDateScreenProps) {
	const { socialImpactDataContext } = useContext(SocialImpactContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

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
			addNewUnsavedFieldToEditContext({ endDate: '' })
			navigation.goBack()
		}
	}

	const saveSocialImpactStartDate = (year: string, month: string, day: string) => {
		const endDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				customTitle={'quando termina?'}
				customHighlight={['termina']}
				editMode={editModeIsTrue()}
				startDate={editDataContext.unsaved.startDate || socialImpactDataContext.startDate}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveSocialImpactStartDate}
			/>
		</>
	)
}

export { InsertSocialImpactEndDate }
