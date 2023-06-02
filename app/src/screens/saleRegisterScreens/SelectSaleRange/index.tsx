import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleRangeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRange } from '../../../components/_onboarding/PostRange'
import { RangePresentationModal } from '../../../components/_modals/RangePresentationModal'

function SelectSaleRange({ route, navigation }: SelectSaleRangeScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

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

		setSaleDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView')
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
				backgroundColor={theme.green2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectSaleRange }
