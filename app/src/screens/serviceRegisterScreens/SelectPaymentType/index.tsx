import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ route, navigation }: SelectPaymentTypeScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

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
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PaymentMethod
				backgroundColor={theme.purple2}
				itemsColor={theme.purple3}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
