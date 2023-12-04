import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactRangeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../../services/firebase/types'

import { SocialImpactContext } from '../../../../contexts/SocialImpactContext'
import { EditContext } from '../../../../contexts/EditContext'
import { StripeContext } from '../../../../contexts/StripeContext'
import { AuthContext } from '../../../../contexts/AuthContext'

import { PostRange } from '../../../components/_onboarding/PostRange'
import { SubscriptionPresentationModal } from '../../../components/_modals/SubscriptionPresentationModal'

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
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[5, isSecondPost ? 5 : 6]}
			/>
		</>
	)
}

export { SelectSocialImpactRange }
