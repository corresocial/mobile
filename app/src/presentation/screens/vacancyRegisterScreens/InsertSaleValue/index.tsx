import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertSaleValueScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertVacancyValue({ navigation, route }: InsertSaleValueScreenProps) {
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

	const validateVacancyValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveVacancyValue = (saleValue: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ saleValue })

			if (!bothPaymentType) {
				navigation.pop(2)
				navigation.goBack()
				return
			}
		}

		if (bothPaymentType) {
			navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				customTitle={'quanto paga?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 100 reais a diária'}
				keyboardOpened={keyboardOpened}
				validateInputText={validateVacancyValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveVacancyValue}
			/>
		</>
	)
}

export { InsertVacancyValue }
