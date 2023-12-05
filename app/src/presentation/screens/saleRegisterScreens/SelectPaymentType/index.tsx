import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { PaymentType } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PaymentMethod } from '@components/_onboarding/PaymentMethod'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

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
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PaymentMethod
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
