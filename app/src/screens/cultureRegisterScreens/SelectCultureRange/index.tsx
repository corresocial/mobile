import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureRangeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { CultureContext } from '../../../contexts/CultureContext'
import { StripeContext } from '../../../contexts/StripeContext'

import { PostRange } from '../../../components/_onboarding/PostRange'
import { RangePresentationModal } from '../../../components/_modals/RangePresentationModal'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { stripeProductsPlans } = useContext(StripeContext)

	const [rangePresentationModalIsVisible, setRangePresentationModalIsVisible] = useState(false)

	useEffect(() => {
		if (!editModeIsTrue()) setRangePresentationModalIsVisible(true)
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const closeRangePresentationModal = () => setRangePresentationModalIsVisible(false)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ range: postRange })
		navigation.navigate('SelectCultureLocationView', {
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<RangePresentationModal
				visibility={rangePresentationModalIsVisible}
				onPressButton={closeRangePresentationModal}
				closeModal={closeRangePresentationModal}
			/>
			<PostRange
				backgroundColor={theme.blue2}
				plansAvailable={stripeProductsPlans}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[3, 4]}
			/>
		</>
	)
}

export { SelectCultureRange }
