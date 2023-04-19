import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCultureEndDateScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'
import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertCultureEndDate({ route, navigation }: InsertCultureEndDateScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
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

	const skipScreen = () => navigation.navigate('InsertCultureEndHour')

	const saveCultureStartDate = (year: string, month: string, day: string) => {
		const endDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ endDate })
		navigation.navigate('InsertCultureEndHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				customTitle={'quando termina?'}
				customHighlight={['termina']}
				editMode={editModeIsTrue()}
				startDate={cultureDataContext.startDate}
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

export { InsertCultureEndDate }
