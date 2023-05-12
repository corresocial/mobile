import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SelectSaleValueTypeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { SaleValueType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PaymentValueType } from '../../../components/_onboarding/PaymentValueType'
import { theme } from '../../../common/theme'

function SelectSaleValueType({ route, navigation }: SelectSaleValueTypeScreenProps) {
	const { isSecondPost, vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveVacancyValueType = (paymentType: SaleValueType) => {
		const { bothPaymentType } = route.params

		const editModeIsTrue = () => !!(route.params && route.params.editMode)

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
					setVacancyDataOnContext({ saleValue: 'a combinar' })
				}

				if (bothPaymentType) {
					navigation.navigate('InsertExchangeValue', { editMode: editModeIsTrue() })
					return
				}

				if (isSecondPost) {
					navigation.reset({
						index: 0,
						routes: [{
							name: 'EditVacancyPostReview',
							params: {
								postData: { ...vacancyDataContext, saleValue: 'a combinar' },
								unsavedPost: true
							}
						}]
					})
					return
				}

				navigation.navigate('SelectVacancyRange')
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
				progress={[3, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePaymentValueType={saveVacancyValueType}
			/>
		</>
	)
}

export { SelectSaleValueType }
