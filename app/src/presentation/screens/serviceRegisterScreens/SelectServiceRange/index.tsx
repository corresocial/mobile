import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { PostRange as PostRangeType } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { ServiceContext } from '@contexts/ServiceContext'
import { StripeContext } from '@contexts/StripeContext'

import { SelectServiceRangeScreenProps } from '@routes/Stack/ServiceStack/screenProps'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { PostRange } from '@components/_onboarding/PostRange'

function SelectServiceRange({ route, navigation }: SelectServiceRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)
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
			navigation.goBack()
			return
		}

		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditServicePostReview',
					params: {
						postData: {
							...serviceDataContext,
							range: postRange,
							deliveryMethod: serviceDataContext.deliveryMethod || 'unavailable',
						},
						unsavedPost: true
					}
				}]
			})
		} else {
			setServiceDataOnContext({ range: postRange })
			navigation.navigate('SelectLocationView')
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
				progress={[4, isSecondPost ? 3 : 5]}
			/>
		</>
	)
}

export { SelectServiceRange }
