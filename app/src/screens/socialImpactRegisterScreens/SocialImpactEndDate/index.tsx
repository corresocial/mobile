import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactEndDateScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'
import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertSocialImpactEndDate({ route, navigation }: InsertSocialImpactEndDateScreenProps) {
	const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertSocialImpactEndHour')

	const saveSocialImpactStartDate = (year: string, month: string, day: string) => {
		const endDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ endDate })
		navigation.navigate('InsertSocialImpactEndHour')
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
				startDate={socialImpactDataContext.startDate}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveStartDate={saveSocialImpactStartDate}
			/>
		</>
	)
}

export { InsertSocialImpactEndDate }
