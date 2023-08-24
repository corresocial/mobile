import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSaleValueScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {
	const { isSecondPost, serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)
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

			return
		}

		setServiceDataOnContext({ saleValue })

		if (bothPaymentType) {
			navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
		} else {
			if (isSecondPost) {
				navigation.reset({
					index: 0,
					routes: [{
						name: 'EditServicePostReview',
						params: {
							postData: { ...serviceDataContext, saleValue },
							unsavedPost: true
						}
					}]
				})
				return
			}

			navigation.navigate('SelectServiceRange')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'por quanto você vende?'}
				customHighlight={['quanto']}
				inputPlaceholder={'ex: 120 reais a diária'}
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
