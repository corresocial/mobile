import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { CultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'
import { StripeContext } from '@contexts/StripeContext'

import { PostRange as PostRangeType } from '@services/firebase/types'

import { theme } from '../../../common/theme'
import { SubscriptionPresentationModal } from '../../../components/_modals/SubscriptionPresentationModal'
import { PostRange } from '../../../components/_onboarding/PostRange'
import { SelectCultureRangeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
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
					name: 'EditCulturePostReview',
					params: {
						postData: {
							...cultureDataContext,
							range: postRange
						},
						unsavedPost: true
					}
				}]
			})
		} else {
			setCultureDataOnContext({ range: postRange })
			navigation.navigate('SelectCultureLocationView', {
				editMode: editModeIsTrue(),
				initialValue: route.params?.initialValue
			})
		}
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.blue2}
				itemsColor={theme.blue3}
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, isSecondPost ? 4 : 5]}
			/>
		</>
	)
}

export { SelectCultureRange }
