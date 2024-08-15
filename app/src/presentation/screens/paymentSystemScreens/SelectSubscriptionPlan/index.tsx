import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SubscriptionPlan as SubscriptionPlanType } from '@domain/user/entity/types'

import { StripeContext } from '@contexts/StripeContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { SelectSubscriptionPlanScreenProps } from '@routes/Stack/UserStack/screenProps'

import { UiSubscriptionUtils } from '@utils-ui/subscription/UiSubscriptionUtils'

import { theme } from '@common/theme'

import { SubscriptionPlan } from '@components/_onboarding/SubscriptionPlan'

const { getPostRangeLabelHiglighted } = UiSubscriptionUtils()

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
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<SubscriptionPlan
				backgroundColor={theme.colors.orange[2]}
				plansAvailable={stripeProductsPlans}
				postRange={postRange}
				headerFooterText={getPostRangeLabelHiglighted(postRange)}
				navigateBackwards={() => navigation.goBack()}
				saveSubscriptionPlan={saveSubscriptionPlan}
			/>
		</>
	)
}

export { SelectSubscriptionPlan }
