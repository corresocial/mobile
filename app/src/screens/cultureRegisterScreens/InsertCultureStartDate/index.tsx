import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCultureStartDateScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertCultureStartDate({ route, navigation }: InsertCultureStartDateScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
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

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertCultureStartHour')

	const saveCultureStartDate = (year: string, month: string, day: string) => {
		const startDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ startDate })
		navigation.navigate('InsertCultureStartHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveStartDate={saveCultureStartDate}
			/>
		</>
	)
}

export { InsertCultureStartDate }
