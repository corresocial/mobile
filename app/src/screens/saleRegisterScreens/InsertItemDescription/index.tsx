import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertItemDescriptionScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputDescription } from '../../../components/_onboarding/PostInputDescription'

function InsertItemDescription({ route, navigation }: InsertItemDescriptionScreenProps) {
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

	const validateSaleDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveItemDescription = (description: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemDescription: description })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ itemDescription: description })
		navigation.navigate('InsertSalePicture')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputDescription
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				inputPlaceholder={'ex: sofá azul usado em sala de espera.'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveItemDescription}
			/>
		</>
	)
}

export { InsertItemDescription }
