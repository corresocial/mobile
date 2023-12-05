import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SelectSaleValueTypeScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'

import { SaleValueType } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PaymentValueType } from '@components/_onboarding/PaymentValueType'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveVacancyValueType = (paymentType: SaleValueType) => {
		const { bothPaymentType } = route.params

		const editModeIsTrue = () => !!(route.params && route.params.editMode)

		switch (paymentType) {
			case 'fixed': {
				navigation.navigate('InsertSaleValue', { bothPaymentType, editMode: editModeIsTrue() })
				break
			}
			case 'toMatch': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ saleValue: 'a combinar' })
					if (!bothPaymentType) {
						navigation.goBack()
						navigation.goBack()
						return
					}
				}

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
				}

				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PaymentValueType
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				navigateBackwards={() => navigation.goBack()}
				savePaymentValueType={saveVacancyValueType}
			/>
		</>
	)
}

export { SelectSaleValueType }
