import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertSaleValueScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
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

	const validateSaleValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSaleValue = (value: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ saleValue: value })
			navigation.goBack()
		}

		setSaleDataOnContext({ saleValue: value })

		if (route.params.bothPaymentType) {
			navigation.navigate('InsertExchangeValue')
		} else {
			// navigation.navigate('SelectSaleRange')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				customTitle={'quanto paga?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 100 reais a diária'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSaleValue}
			/>
		</>
	)
}

export { InsertSaleValue }
