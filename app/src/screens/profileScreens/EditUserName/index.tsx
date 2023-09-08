import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { EditUserNameScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function EditUserName({ navigation, route }: EditUserNameScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

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
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<PostInputText
				height={'50%'}
				customTitle={'edite o seu nome'}
				customHighlight={['nome']}
				multiline
				inputPlaceholder={'qual é o seu nome?'}
				backgroundColor={theme.orange2}
				validationColor={theme.orange1}
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
