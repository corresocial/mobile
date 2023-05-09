import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PaymentValueType } from '../../../components/_onboarding/PaymentValueType'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { isSecondPost, setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSaleValueType = (paymentType: SaleValueType) => {
		const { bothPaymentType } = route.params

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
				} else {
					setServiceDataOnContext({ saleValue: 'a combinar' })
				}

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
					return
				}

				if (isSecondPost) {
					return navigation.navigate('ServiceReview')
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
				progress={[3, isSecondPost ? 3 : 5]}
			/>
		</>
	)
}

export { SelectSaleValueType }
