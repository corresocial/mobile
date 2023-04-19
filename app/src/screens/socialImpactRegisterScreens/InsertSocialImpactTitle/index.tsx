import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactTitleScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'
import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertSocialImpactTitle({ route, navigation }: InsertSocialImpactTitleScreenProps) {
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

	const validateSocialImpactTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSocialImpactTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ title: inputText })
		navigation.navigate('InsertSocialImpactDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				inputPlaceholder={'ex: projeto criança feliz'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSocialImpactTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSocialImpactTitle}
			/>
		</>
	)
}

export { InsertSocialImpactTitle }
