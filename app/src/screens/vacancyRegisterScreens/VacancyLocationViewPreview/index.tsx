import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { VacancyLocationViewPreviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostLocationViewPreview } from '../../../components/_onboarding/PostLocationViewPreview'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function VacancyLocationViewPreview({ route, navigation }: VacancyLocationViewPreviewScreenProps) {
	const { vacancyDataContext } = useContext(VacancyContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = vacancyDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getCurrentMarkerCoordinate = () => {
		if (editModeIsTrue()) {
			return {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
		}

		return {
			...vacancyDataContext?.location?.coordinates,
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
				name: 'EditVacancyPostReview',
				params: {
					postData: {
						...vacancyDataContext,
						locationView,
						paymentType: vacancyDataContext.paymentType || 'sale',
						saleValue: vacancyDataContext.saleValue || 'a combinar',
					},
					unsavedPost: true,
					showPresentationModal: true
				}
			}]
		})
	}

	const getPostRange = () => {
		if (editModeIsTrue()) {
			return vacancyDataContext.range || 'near'
		}

		return postRange || 'near'
	}

	const getPlaceName = () => {
		switch (getPostRange()) {
			case 'near': return 'near'
			case 'city': return editModeIsTrue() ? editDataContext.unsaved.location?.city : vacancyDataContext.location?.city
			case 'country': return 'Brasil'
			default: return ''
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostLocationViewPreview
				backgroundColor={theme.yellow2}
				saveLocationView={saveLocationView}
				initialValue={getCurrentMarkerCoordinate()}
				postRange={getPostRange()}
				placeName={getPlaceName()}
				placeColor={theme.transparence.yellow3}
				locationViewSelected={route.params.locationView}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { VacancyLocationViewPreview }
