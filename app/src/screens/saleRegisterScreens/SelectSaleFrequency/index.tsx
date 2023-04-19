import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleFrequencyScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectSaleFrequency({ route, navigation }: SelectSaleFrequencyScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertSaleStartHour')

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
					return
				}

				setSaleDataOnContext({
					attendanceFrequency: saleFrequency,
					daysOfWeek: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertSaleStartHour')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: saleFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setSaleDataOnContext({
					attendanceFrequency: saleFrequency,
					daysOfWeek: [...daysOfWeek]
				})
				navigation.navigate('InsertSaleStartHour')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ attendanceFrequency: saleFrequency })
				} else {
					setSaleDataOnContext({ attendanceFrequency: saleFrequency })
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
					return
				}

				setSaleDataOnContext({
					attendanceFrequency: saleFrequency,
					daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertSaleStartHour')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.green2}
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveSaleFrequency}
			/>
		</>
	)
}

export { SelectSaleFrequency }
