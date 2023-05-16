import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertExchangeValueScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertExchangeValue({ route, navigation }: InsertExchangeValueScreenProps) {
	const { isSecondPost, vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
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
			return
		}

		setVacancyDataOnContext({ exchangeValue })

		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditVacancyPostReview',
					params: {
						postData: { ...vacancyDataContext, exchangeValue },
						unsavedPost: true
					}
				}]
			})
			return
		}

		navigation.navigate('SelectVacancyRange')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				customTitle={'o que você aceita em troca?'}
				customHighlight={['o', 'que', 'em', 'troca']}
				inputPlaceholder={'ex: troco por coisas usadas'}
				// initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateExchangeValue}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveExchangeValue}
			/>
		</>
	)
}

export { InsertExchangeValue }
