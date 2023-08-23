import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ route, navigation }: SelectPaymentTypeScreenProps) {
	const { isSecondPost, setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exchangeValue: '' })
				} else {
					setServiceDataOnContext({ exchangeValue: '' })
				}

				navigation.navigate('SelectSaleValueType', { bothPaymentType: false, editMode: editModeIsTrue() })
				break
			}
			case 'exchange': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ saleValue: '' })
				} else {
					setServiceDataOnContext({ saleValue: '' })
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
				progress={[3, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
