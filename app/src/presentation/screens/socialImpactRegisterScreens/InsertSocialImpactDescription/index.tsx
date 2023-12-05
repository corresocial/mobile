import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

import { InsertSocialImpactDescriptionScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

function InsertSocialImpactDescription({ route, navigation }: InsertSocialImpactDescriptionScreenProps) {
	const { isSecondPost, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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

	const validateSocialImpactTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSocialImpactTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ description: inputText })
		navigation.navigate('SelectSocialImpactRange')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				inputPlaceholder={'ex: projeto criança feliz'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[4, isSecondPost ? 5 : 6]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSocialImpactTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSocialImpactTitle}
			/>
		</>
	)
}

export { InsertSocialImpactDescription }
