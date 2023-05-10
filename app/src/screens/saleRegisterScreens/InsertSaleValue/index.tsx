import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertSaleValueScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { isSecondPost, setSaleDataOnContext } = useContext(SaleContext)
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
		} else {
			setSaleDataOnContext({ saleValue })
		}

		if (route.params.bothPaymentType) {
			navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
		} else {
			if (isSecondPost) {
				return navigation.navigate('SaleReview')
			}

			navigation.navigate('SelectSaleRange')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				customTitle={'por quanto você vende?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 100 reais'}
				// initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSaleValue}
			/>
		</>
	)
}

export { InsertSaleValue }
