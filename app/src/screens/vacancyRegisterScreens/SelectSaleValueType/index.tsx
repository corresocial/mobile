import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PaymentValueType } from '../../../components/_onboarding/PaymentValueType'
import { theme } from '../../../common/theme'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const saveVacancyValueType = (paymentType: SaleValueType) => {
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
				console.log('a')
				//  navigation.navigate('SelectVacancyRange')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PaymentValueType
				backgroundColor={theme.yellow2}
				progress={[3, 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentValueType={saveVacancyValueType}
			/>
		</>
	)
}

export { SelectSaleValueType }
