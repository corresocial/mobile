import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SaleLocationViewPreviewScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostLocationViewPreview } from '../../../components/_onboarding/PostLocationViewPreview'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function SaleLocationViewPreview({ route, navigation }: SaleLocationViewPreviewScreenProps) {
	const { saleDataContext, setSaleDataOnContext } = useContext(SaleContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = saleDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getCurrentMarkerCoordinate = () => {
		if (editModeIsTrue()) {
			return {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
		}

		return {
			...saleDataContext?.location?.coordinates,
			...defaultDeltaCoordinates
		}
	}

	const saveLocationView = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView })
			navigation.pop(3)
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ locationView })
		navigation.navigate('SelectDeliveryMethod')
	}

	const getPostRange = () => {
		if (editModeIsTrue()) {
			return saleDataContext.range || 'near'
		}

		return postRange || 'near'
	}

	const getPlaceName = () => {
		switch (postRange) {
			case 'near': return 'near'
			case 'city': return editModeIsTrue() ? editDataContext.unsaved.location?.city : saleDataContext.location?.city
			case 'country': return 'Brasil'
			default: return ''
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostLocationViewPreview
				backgroundColor={theme.green2}
				saveLocationView={saveLocationView}
				initialValue={getCurrentMarkerCoordinate()}
				postRange={getPostRange()}
				placeName={getPlaceName()}
				placeColor={theme.transparence.green3}
				locationViewSelected={route.params.locationView}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SaleLocationViewPreview }
