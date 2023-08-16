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
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { stripeProductsPlans } = useContext(StripeContext)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = React.useState(false)

	useEffect(() => {
		if (!editModeIsTrue()) setSubscriptionModalIsVisible(true)
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const closeSubscriptionInfoModal = () => setSubscriptionModalIsVisible(false)

	const savePostRange = (postRange: PostRangeType) => {
		const { workplace } = vacancyDataContext

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ range: postRange })
		if (workplace !== 'homeoffice') {
			navigation.navigate('SelectVacancyLocationView')
		} else {
			navigation.navigate('SelectWorkWeekdays')
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
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectVacancyRange }
