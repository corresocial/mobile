import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StripeContext } from '@contexts/StripeContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { PostRange as PostRangeType } from '@services/firebase/types'

import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '../../../components/_modals/SubscriptionPresentationModal'
import { PostRange } from '../../../components/_onboarding/PostRange'
import { SelectVacancyRangeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

function SelectVacancyRange({ route, navigation }: SelectVacancyRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
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
					name: 'EditVacancyPostReview',
					params: {
						postData: {
							...vacancyDataContext,
							range: postRange
						},
						unsavedPost: true
					}
				}]
			})
		} else {
			setVacancyDataOnContext({ range: postRange })
			navigation.navigate('SelectVacancyLocationView')
		}
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionPresentationModal}
			/>
			<PostRange
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[6, isSecondPost ? 6 : 7]}
			/>
		</>
	)
}

export { SelectVacancyRange }
