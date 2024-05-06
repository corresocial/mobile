import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollDescriptionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPollDescription({ route, navigation }: InsertPollDescriptionScreenProps) {
	const { setPollDataOnContext } = usePollRegisterContext()
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

	const validatePollDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePollDescription = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setPollDataOnContext({ description: inputText })
		navigation.navigate('InsertPollQuestions')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'fale sobre a sua enquete'}
				customHighlight={['fale', 'sobre', 'enquete']}
				inputPlaceholder={'descreva sua enquete...'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 3]}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePollDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePollDescription}
			/>
		</>
	)
}

export { InsertPollDescription }
