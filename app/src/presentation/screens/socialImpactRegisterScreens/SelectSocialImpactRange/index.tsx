import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'
import { StripeContext } from '@contexts/StripeContext'

import { SelectSocialImpactRangeScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'
import { PostRange as PostRangeType } from '@domain/post/entity/types'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { PostRange } from '@components/_onboarding/PostRange'

function SelectSocialImpactRange({ route, navigation }: SelectSocialImpactRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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
					name: 'EditSocialImpactPostReview',
					params: {
						postData: {
							...socialImpactDataContext,
							range: postRange,
							repeat: 'unrepeatable'
						},
						unsavedPost: true
					}
				}]
			})
		} else {
			setSocialImpactDataOnContext({ range: postRange })
			navigation.navigate('SelectSocialImpactLocationView')
		}
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.pink2}
				itemsColor={theme.pink3}
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'city'}
				cityPlanIsFree
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[5, isSecondPost ? 5 : 6]}
			/>
		</>
	)
}

export { SelectSocialImpactRange }
