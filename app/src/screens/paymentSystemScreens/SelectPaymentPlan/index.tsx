import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectPaymentPlanScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { PaymentPlan as PaymentPlanType, PostRange } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'

import { PaymentPlan } from '../../../components/_onboarding/PaymentPlan'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

function SelectPaymentPlan({ route, navigation }: SelectPaymentPlanScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const postRange: PostRange = 'near'

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (paymentPlan: PaymentPlanType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ paymentPlan })
			navigation.goBack()
		}

		// setSocialImpactDataOnContext({ paymentPlan })
		// navigation.navigate('')
	}

	const getRelativePostRangeText = () => {
		switch (postRange as any) { // TODO TYPE
			case 'near': return showMessageWithHighlight('plano região', ['região'])
			case 'city': return showMessageWithHighlight('plano cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('plano país', ['país'])
			default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
		}
	}

	/* const getRelativePostRangeText = () => {
		 const paymentPlanText = getRelativePaymentPlanText()

		switch (postRange) {
			case 'near': return showMessageWithHighlight(`plano região${paymentPlanText && ` - ${paymentPlanText}`}`, ['região', paymentPlanText])
			case 'city': return showMessageWithHighlight(`plano cidade${paymentPlanText && ` - ${paymentPlanText}`}`, ['cidade', paymentPlanText])
			case 'country': return showMessageWithHighlight(`plano país${paymentPlanText && ` - ${paymentPlanText}`}`, ['país', paymentPlanText])
			default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
		}
	}

	const getRelativePaymentPlanText = () => {
		switch (paymentPlan) {
			case 'monthly': return 'mensal'
			case 'yearly': return 'anual'
			default: return ''
		}
	} */

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PaymentPlan
				backgroundColor={theme.orange2}
				headerFooterText={getRelativePostRangeText()}
				navigateBackwards={() => navigation.goBack()}
				savePaymentPlan={savePostRange}
			/>
		</>
	)
}

export { SelectPaymentPlan }
