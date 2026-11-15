import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { EditUserDescriptionScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function EditUserDescription({ route, navigation }: EditUserDescriptionScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

	const validateProfileDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveUserDescription = async (description: string) => {
		addNewUnsavedFieldToEditContext({ description })
		navigation.goBack()
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.orange[2]} barStyle={'dark-content'} />
			<PostInputText
				customTitle={'edite a descrição do seu perfil'}
				customHighlight={['descrição', 'perfil']}
				multiline
				inputPlaceholder={'ex: trabalho de mecânico, tenho 33 anos, etc...'}
				backgroundColor={theme.colors.orange[2]}
				validationColor={theme.colors.orange[1]}
				initialValue={route.params.userDescription}
				keyboardOpened={keyboardOpened}
				validateInputText={validateProfileDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveUserDescription}
			/>
		</>
	)
}

export { EditUserDescription }
