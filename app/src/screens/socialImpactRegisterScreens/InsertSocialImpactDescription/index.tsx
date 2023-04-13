import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactDescriptionScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputDescription } from '../../../components/_onboarding/PostInputDescription'

function InsertSocialImpactDescription({ route, navigation }: InsertSocialImpactDescriptionScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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

	const validateSocialImpactDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSocialImpactDescription = (description: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ description })
		navigation.navigate('InsertSocialImpactPicture')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostInputDescription
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				inputPlaceholder={'ex: projeto de arrecadação para o dia das crianças.'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSocialImpactDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSocialImpactDescription}
			/>
		</>
	)
}

export { InsertSocialImpactDescription }
