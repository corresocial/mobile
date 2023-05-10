import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { InsertSaleValueScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertVacancyValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)
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
			}
		} else {
			setVacancyDataOnContext({ saleValue })
		}

		if (route.params.bothPaymentType) {
			navigation.navigate('InsertExchangeValue')
		} else {
			if (isSecondPost) {
				return navigation.navigate('VacancyReview')
			}

			navigation.navigate('SelectVacancyRange')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				customTitle={'quanto paga?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 100 reais a diária'}
				// initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateVacancyValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveVacancyValue}
			/>
		</>
	)
}

export { InsertVacancyValue }
