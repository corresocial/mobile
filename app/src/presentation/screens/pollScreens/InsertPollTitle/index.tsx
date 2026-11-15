import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollTitleScreenProps } from '@routes/Stack/PollStack/screenProps'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPollTitle({ route, navigation }: InsertPollTitleScreenProps) {
	const { setPollDataOnContext } = usePollRegisterContext()
	const { addNewUnsavedFieldToEditContext, clearEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		clearEditContext()
	}, [])

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

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

		setPollDataOnContext({ title: inputText })
		navigation.navigate('InsertPollDescription')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.colors.purple[2]}
				validationColor={theme.colors.purple[1]}
				customTitle={'qual o título da sua enquete?'}
				customHighlight={['título', 'enquete']}
				inputPlaceholder={'ex: serviços da prefeitura...'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[1, 4]}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePollTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePollTitle}
			/>
		</>
	)
}

export { InsertPollTitle }
