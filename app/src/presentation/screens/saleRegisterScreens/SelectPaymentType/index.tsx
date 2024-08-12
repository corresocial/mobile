import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PaymentType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectPaymentTypeScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { theme } from '@common/theme'

import { PaymentMethod } from '@components/_onboarding/PaymentMethod'

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
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PaymentMethod
				backgroundColor={theme.colors.green[2]}
				itemsColor={theme.colors.green[3]}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePaymentMethod={savePaymentType}
			/>
		</>
	)
}

export { SelectPaymentType }
