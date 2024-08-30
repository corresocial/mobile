import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { PostRange as PostRangeType } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'
import { StripeContext } from '@contexts/StripeContext'

import { SelectCultureRangeScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { PostRange } from '@components/_onboarding/PostRange'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, setCultureDataOnContext } = useCultureContext()
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

		setCultureDataOnContext({ range: postRange })
		navigation.navigate('SelectCultureLocation', { locationView: 'approximate' })
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	const { betweenRange } = checkFreeTrialRange(userDataContext.subscription?.subscriptionRange)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.colors.blue[2]}
				itemsColor={theme.colors.blue[3]}
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				freePlans={betweenRange}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
			/>
		</>
	)
}

export { SelectCultureRange }
