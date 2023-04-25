import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ navigation }: SelectPaymentTypeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				setServiceDataOnContext({ exchangeValue: '' })
				navigation.navigate('SelectSaleValueType', { bothPaymentType: false })
				break
			}
			case 'exchange': {
				setServiceDataOnContext({ saleValue: '' })
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
				backgroundColor={theme.purple2}
				progress={[3, 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
