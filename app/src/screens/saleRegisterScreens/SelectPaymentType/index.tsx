import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ navigation }: SelectPaymentTypeScreenProps) {
	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				navigation.navigate('SelectSaleValueType', { bothPaymentType: false })
				break
			}
			case 'exchange': {
				navigation.navigate('InsertExchangeValue')
				break
			}
			case 'both': {
				navigation.navigate('SelectSaleValueType', { bothPaymentType: true })
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PaymentMethod
				backgroundColor={theme.green2}
				progress={[3, 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
