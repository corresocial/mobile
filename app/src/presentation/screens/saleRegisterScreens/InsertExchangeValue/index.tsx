import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { theme } from '../../../common/theme'
import { PostInputText } from '../../../components/_onboarding/PostInputText'
import { InsertExchangeValueScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

function InsertExchangeValue({ route, navigation }: InsertExchangeValueScreenProps) {
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

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
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.green2}
				validationColor={theme.green1}
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
