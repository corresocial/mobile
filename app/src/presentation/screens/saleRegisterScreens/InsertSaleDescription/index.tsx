import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SaleContext } from '@contexts/SaleContext'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

import { InsertSaleDescriptionScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

function InsertSaleDescription({ route, navigation }: InsertSaleDescriptionScreenProps) {
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

	const validateSaleDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveSaleDescription = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ description: inputText })
		navigation.navigate('SelectSaleRange')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[4, isSecondPost ? 5 : 6]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSaleDescription}
			/>
		</>
	)
}

export { InsertSaleDescription }
