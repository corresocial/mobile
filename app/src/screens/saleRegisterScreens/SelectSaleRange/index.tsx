import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleRangeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'
import { StripeContext } from '../../../contexts/StripeContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { PostRange } from '../../../components/_onboarding/PostRange'
import { SubscriptionPresentationModal } from '../../../components/_modals/SubscriptionPresentationModal'

function SelectSaleRange({ route, navigation }: SelectSaleRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { isSecondPost, saleDataContext, setSaleDataOnContext } = useContext(SaleContext)
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
					name: 'EditSalePostReview',
					params: {
						postData: {
							...saleDataContext,
							range: postRange,
							deliveryMethod: saleDataContext.deliveryMethod || 'unavailable',
						},
						unsavedPost: true
					}
				}]
			})
		} else {
			setSaleDataOnContext({ range: postRange })
			navigation.navigate('SelectLocationView')
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
				progress={[5, isSecondPost ? 5 : 6]}
			/>
		</>
	)
}

export { SelectSaleRange }
