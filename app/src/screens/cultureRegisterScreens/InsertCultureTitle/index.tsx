import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { InsertCultureTitleScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertCultureTitle({ route, navigation }: InsertCultureTitleScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
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

	const validateCultureTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ title: inputText })
		navigation.navigate('InsertCultureDescription')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				inputPlaceholder={'ex: exposição de arte'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateCultureTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveCultureTitle}
			/>
		</>
	)
}

export { InsertCultureTitle }
