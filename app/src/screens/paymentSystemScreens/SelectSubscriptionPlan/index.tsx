import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { SelectSubscriptionPlanScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SubscriptionPlan as SubscriptionPlanType, PostRange } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'

import { SubscriptionPlan } from '../../../components/_onboarding/SubscriptionPlan'

function SelectSubscriptionPlan({ route, navigation }: SelectSubscriptionPlanScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const postRange: PostRange = 'near' // Route or context

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSubscriptionPlan = (subscriptionPlan: SubscriptionPlanType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ subscriptionPlan })
			navigation.goBack()
		}

		// setSocialImpactDataOnContext({ subscriptionPlan })
		navigation.navigate('SelectSubsciptionPaymentMethod')
	}

	const getRelativePostRangeText = () => {
		switch (postRange as any) { // TODO TYPE
			case 'near': return showMessageWithHighlight('plano região', ['região'])
			case 'city': return showMessageWithHighlight('plano cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('plano país', ['país'])
			default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<SubscriptionPlan
				backgroundColor={theme.orange2}
				headerFooterText={getRelativePostRangeText()}
				navigateBackwards={() => navigation.goBack()}
				saveSubscriptionPlan={saveSubscriptionPlan}
			/>
		</>
	)
}

export { SelectSubscriptionPlan }
