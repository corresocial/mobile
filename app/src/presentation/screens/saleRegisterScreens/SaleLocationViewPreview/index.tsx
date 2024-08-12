import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'

import { SaleLocationViewPreviewScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationViewPreview } from '@components/_onboarding/PostLocationViewPreview'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function SaleLocationViewPreview({ route, navigation }: SaleLocationViewPreviewScreenProps) {
	const { incomeDataContext } = useIncomeContext()
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = incomeDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getCurrentMarkerCoordinate = () => {
		if (editModeIsTrue()) {
			return {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
		}

		return {
			...incomeDataContext?.location?.coordinates,
			...defaultDeltaCoordinates
		}
	}

	const saveLocationView = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView })
			navigation.pop(2)
			navigation.goBack()
			return
		}

		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditSalePostReview',
				params: {
					postData: {
						...incomeDataContext,
						locationView
					},
					unsavedPost: true,
					showPresentationModal: true
				}
			}]
		})
	}

	const getPostRange = () => {
		if (editModeIsTrue()) {
			return incomeDataContext.range || 'near'
		}

		return postRange || 'near'
	}

	const getPlaceName = () => {
		switch (getPostRange()) {
			case 'near': return 'near'
			case 'city': return editModeIsTrue() ? editDataContext.unsaved.location?.city : incomeDataContext.location?.city
			case 'country': return 'Brasil'
			default: return ''
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostLocationViewPreview
				backgroundColor={theme.colors.green[2]}
				saveLocationView={saveLocationView}
				initialValue={getCurrentMarkerCoordinate()}
				postRange={getPostRange()}
				placeName={getPlaceName()}
				placeColor={theme.transparence.green()}
				locationViewSelected={route.params.locationView}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SaleLocationViewPreview }
