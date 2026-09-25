import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertSaleValueScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
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

	const { bothPaymentType } = route.params

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validateSaleValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSaleValue = (saleValue: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ saleValue })

			if (!bothPaymentType) {
				navigation.pop(2)
				navigation.goBack()
			}
		}

		if (bothPaymentType) {
			navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.colors.green[2]}
				validationColor={theme.colors.green[1]}
				customTitle={'por quanto você vende?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 100 reais'}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSaleValue}
			/>
		</>
	)
}

export { InsertSaleValue }
