import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { PostRange as PostRangeType } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { useSocialImpactContext } from '@contexts/SocialImpactContext'
import { StripeContext } from '@contexts/StripeContext'

import { SelectSocialImpactRangeScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { PostRange } from '@components/_onboarding/PostRange'

function SelectSocialImpactRange({ route, navigation }: SelectSocialImpactRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, setSocialImpactDataOnContext } = useSocialImpactContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { stripeProductsPlans } = useContext(StripeContext)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = React.useState(false)

	useEffect(() => {
		if (!editModeIsTrue() && !isSecondPost) setSubscriptionModalIsVisible(true)
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const closeSubscriptionPresentationModal = () => setSubscriptionModalIsVisible(false)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
			return navigation.goBack()
		}

		setSocialImpactDataOnContext({ range: postRange })
		navigation.navigate('SelectSocialImpactLocation', { locationView: 'approximate' })
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	const { betweenRange } = checkFreeTrialRange(userDataContext.subscription?.subscriptionRange)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.colors.pink[2]}
				itemsColor={theme.colors.pink[3]}
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'city'}
				cityPlanIsFree
				freePlans={betweenRange}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
			/>
		</>
	)
}

export { SelectSocialImpactRange }
