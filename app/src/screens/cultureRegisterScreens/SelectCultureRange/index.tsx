import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureRangeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { CultureContext } from '../../../contexts/CultureContext'
import { StripeContext } from '../../../contexts/StripeContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

import { SubscriptionInfoModal } from '../../../components/_modals/SubscriptionInfoModal'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { stripeProductsPlans } = useContext(StripeContext)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = React.useState(false)

	useEffect(() => {
		if (!editModeIsTrue()) setSubscriptionModalIsVisible(true)
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const closeSubscriptionInfoModal = () => setSubscriptionModalIsVisible(false)

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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<SubscriptionInfoModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionInfoModal}
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
