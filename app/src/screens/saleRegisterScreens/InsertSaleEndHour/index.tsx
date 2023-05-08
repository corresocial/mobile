import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSaleEndHourScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTime } from '../../../components/_onboarding/PostTime'

function InsertSaleEndHour({ route, navigation }: InsertSaleEndHourScreenProps) {
	const { saleDataContext, setSaleDataOnContext } = useContext(SaleContext)
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

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: '' })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ endHour: '' as any })
		navigation.navigate('SaleReview')
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const endHour = new Date()
		endHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ endHour })
		navigation.navigate('SaleReview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				customTitle={'que horas você termina?'}
				customHighlight={['que', 'horas', 'termina']}
				startTime={editDataContext.unsaved.startHour || saleDataContext.startHour}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertSaleEndHour }
