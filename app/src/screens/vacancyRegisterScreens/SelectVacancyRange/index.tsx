import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyRangeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'
import { StripeContext } from '../../../contexts/StripeContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { PostRange } from '../../../components/_onboarding/PostRange'
import { SubscriptionInfoModal } from '../../../components/_modals/SubscriptionInfoModal'

function SelectVacancyRange({ route, navigation }: SelectVacancyRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
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
					name: 'EditVacancyPostReview',
					params: {
						postData: {
							...vacancyDataContext,
							range: postRange,
							paymentType: vacancyDataContext.paymentType || 'sale',
							saleValue: vacancyDataContext.saleValue || 'a combinar',
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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<SubscriptionInfoModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				withoutNegativeOption
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={closeSubscriptionInfoModal}
			/>
			<PostRange
				backgroundColor={theme.yellow2}
				itemsColor={theme.yellow3}
				isVacancy
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
