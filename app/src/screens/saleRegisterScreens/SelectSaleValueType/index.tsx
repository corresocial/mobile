import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PaymentValueType } from '../../../components/_onboarding/PaymentValueType'
import { theme } from '../../../common/theme'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
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
					setSaleDataOnContext({ saleValue: 'a combinar' })
				}

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
					return
				}

				navigation.navigate('SelectSaleRange')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PaymentValueType
				backgroundColor={theme.green2}
				progress={[3, 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentValueType={saveSaleValueType}
			/>
		</>
	)
}

export { SelectSaleValueType }
