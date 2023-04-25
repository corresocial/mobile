import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentTypeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PaymentType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { PaymentMethod } from '../../../components/_onboarding/PaymentMethod'

function SelectPaymentType({ navigation }: SelectPaymentTypeScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const savePaymentType = (paymentType: PaymentType) => {
		switch (paymentType) {
			case 'sale': {
				setVacancyDataOnContext({ paymentType })
				navigation.navigate('SelectSaleValueType', { bothPaymentType: false })
				break
			}
			case 'exchange': {
				setVacancyDataOnContext({ paymentType })
				navigation.navigate('InsertExchangeValue')
				break
			}
			case 'both': {
				setVacancyDataOnContext({ paymentType })
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
				backgroundColor={theme.yellow2}
				customTitle={'qual é o tipo de remuneração?'}
				customHighlight={['tipo', 'de', 'remuneração']}
				isVacancy
				progress={[3, 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
