import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ route, navigation }: SelectPaymentTypeScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ saleValue: '', exchangeValue: '' })
			navigation.goBack()
		}
	}

	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exchangeValue: '' })
				}

				navigation.navigate('SelectSaleValueType', { bothPaymentType: false, editMode: editModeIsTrue() })
				break
			}
			case 'exchange': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ saleValue: '' })
				}

				navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
				break
			}
			case 'both': {
				navigation.navigate('SelectSaleValueType', { bothPaymentType: true, editMode: editModeIsTrue() })
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PaymentMethod
				backgroundColor={theme.yellow2}
				itemsColor={theme.yellow3}
				customTitle={'qual é o tipo de remuneração?'}
				customHighlight={['tipo', 'de', 'remuneração']}
				isVacancy
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
