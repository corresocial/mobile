import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek, WeekdaysFrequency } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectSaleFrequencyScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { theme } from '@common/theme'

import { PostFrequency } from '@components/_onboarding/PostFrequency'

function SelectSaleFrequency({ route, navigation }: SelectSaleFrequencyScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				attendanceFrequency: '',
				daysOfWeek: []
			})
			navigation.goBack()
		}
	}

	const saveSaleFrequency = (saleFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (saleFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: saleFrequency,
						daysOfWeek: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
				}
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: saleFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
				}
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ attendanceFrequency: saleFrequency })
				}

				navigation.navigate('SelectSaleDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: saleFrequency,
						daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
				}

				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.colors.green[2]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveSaleFrequency}
			/>
		</>
	)
}

export { SelectSaleFrequency }
