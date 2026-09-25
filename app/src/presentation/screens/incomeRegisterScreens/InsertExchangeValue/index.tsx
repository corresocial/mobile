import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertExchangeValueScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertExchangeValue({ route, navigation }: InsertExchangeValueScreenProps) {
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validateExchangeValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const navigateToEditScreen = () => {
		if (editDataContext.unsaved.saleValue) {
			if (editDataContext.unsaved.saleValue === 'a combinar') {
				navigation.pop(2)
				navigation.goBack()
			} else {
				navigation.pop(3)
				navigation.goBack()
			}
			return
		}
		navigation.goBack()
		navigation.goBack()
	}

	const saveExchangeValue = (exchangeValue: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ exchangeValue })
			navigateToEditScreen()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.colors.green[2]}
				validationColor={theme.colors.green[1]}
				customTitle={'o que você aceita em troca?'}
				customHighlight={['o', 'que', 'em', 'troca']}
				inputPlaceholder={'ex: troco por uma marmita'}
				keyboardOpened={keyboardOpened}
				validateInputText={validateExchangeValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveExchangeValue}
			/>
		</>
	)
}

export { InsertExchangeValue }
