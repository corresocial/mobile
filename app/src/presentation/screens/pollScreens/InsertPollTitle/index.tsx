import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollTitleScreenProps } from '@routes/Stack/PollStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPollTitle({ route, navigation }: InsertPollTitleScreenProps) {
	const { setPollDataOnContext } = useContext(PollRegisterContext)
	const { addNewUnsavedFieldToEditContext, clearEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		clearEditContext()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validatePollTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePollTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setPollDataOnContext({ description: inputText })
		navigation.navigate('InsertPollDescription')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'qual o título da sua enquete?'}
				customHighlight={['título', 'enquete']}
				inputPlaceholder={'ex: serviços da prefeitura...'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				// progress={[1, 3]}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePollTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePollTitle}
			/>
		</>
	)
}

export { InsertPollTitle }
