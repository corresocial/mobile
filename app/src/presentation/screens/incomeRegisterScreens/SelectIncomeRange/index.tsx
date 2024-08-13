import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { PostRange as PostRangeType } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'
import { StripeContext } from '@contexts/StripeContext'

import { SelectIncomeRangeScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { PostRange } from '@components/_onboarding/PostRange'

function SelectIncomeRange({ route, navigation }: SelectIncomeRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost } = useIncomeContext()
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
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	const { range } = checkFreeTrialRange(userDataContext.subscription?.subscriptionRange)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.colors.green[2]}
				itemsColor={theme.colors.green[3]}
				userSubscriptionRange={range || 'near'}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[5, isSecondPost ? 5 : 6]}
			/>
		</>
	)
}

export { SelectIncomeRange }
