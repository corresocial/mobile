import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PaymentValueType } from '../../../components/_onboarding/PaymentValueType'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const saveSaleValueType = (paymentType: SaleValueType) => {
		const { bothPaymentType } = route.params

		switch (paymentType) {
			case 'fixed': {
				navigation.navigate('InsertSaleValue', { bothPaymentType })
				break
			}
			case 'toMatch': {
				setServiceDataOnContext({ saleValue: 'a combinar' })

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue')
					return
				}
				navigation.navigate('SelectServiceRange')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PaymentValueType
				backgroundColor={theme.purple2}
				navigateBackwards={() => navigation.goBack()}
				savePaymentValueType={saveSaleValueType}
				progress={[3, 5]}
			/>
		</>
	)
}

export { SelectSaleValueType }
