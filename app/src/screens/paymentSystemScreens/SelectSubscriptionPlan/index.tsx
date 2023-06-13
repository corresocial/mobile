import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { getRangePlanText } from '../../../utils/subscription/commonMessages'

import { SelectSubscriptionPlanScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SubscriptionPlan as SubscriptionPlanType } from '../../../services/firebase/types'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'
import { StripeContext } from '../../../contexts/StripeContext'

import { SubscriptionPlan } from '../../../components/_onboarding/SubscriptionPlan'

function SelectSubscriptionPlan({ route, navigation }: SelectSubscriptionPlanScreenProps) {
	const { setSubscriptionDataOnContext } = useContext(SubscriptionContext)
	const { stripeProductsPlans } = useContext(StripeContext)

	const postRange = route.params?.postRange || 'near'

	const saveSubscriptionPlan = (subscriptionPlan: SubscriptionPlanType) => {
		setSubscriptionDataOnContext({ subscriptionPlan, subscriptionRange: postRange })
		navigation.navigate('SelectSubsciptionPaymentMethod', { postReview: !!route.params.postReview })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<SubscriptionPlan
				backgroundColor={theme.orange2}
				plansAvailable={stripeProductsPlans}
				postRange={postRange}
				headerFooterText={getRangePlanText(postRange)}
				navigateBackwards={() => navigation.goBack()}
				saveSubscriptionPlan={saveSubscriptionPlan}
			/>
		</>
	)
}

export { SelectSubscriptionPlan }
