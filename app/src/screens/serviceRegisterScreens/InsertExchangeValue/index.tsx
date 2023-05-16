import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertExchangeValueScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertExchangeValue({ route, navigation }: InsertExchangeValueScreenProps) {
	const { isSecondPost, serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)
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

		setServiceDataOnContext({ exchangeValue })

		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditServicePostReview',
					params: {
						postData: { ...serviceDataContext, exchangeValue },
						unsavedPost: true
					}
				}]
			})
			return
		}

		navigation.navigate('SelectServiceRange')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'o que você aceita em troca?'}
				customHighlight={['o', 'que', 'em', 'troca']}
				inputPlaceholder={'ex: troco por uma marmita'}
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
