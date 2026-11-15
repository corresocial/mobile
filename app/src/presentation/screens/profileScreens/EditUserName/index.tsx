import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { EditUserNameScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function EditUserName({ navigation, route }: EditUserNameScreenProps) {
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

	const validateName = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveUserName = async (name: string) => {
		addNewUnsavedFieldToEditContext({ name })
		navigation.goBack()
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.orange[2]} barStyle={'dark-content'} />
			<PostInputText
				height={'50%'}
				customTitle={'edite o seu nome'}
				customHighlight={['nome']}
				multiline
				inputPlaceholder={'qual é o seu nome?'}
				backgroundColor={theme.colors.orange[2]}
				validationColor={theme.colors.orange[1]}
				initialValue={route.params.userName}
				keyboardOpened={keyboardOpened}
				validateInputText={validateName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveUserName}
			/>
		</>

	)
}

export { EditUserName }
