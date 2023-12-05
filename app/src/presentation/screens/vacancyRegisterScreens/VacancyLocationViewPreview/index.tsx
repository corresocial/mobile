import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { theme } from '@common/theme'

import { PostLocationViewPreview } from '@components/_onboarding/PostLocationViewPreview'

import { VacancyLocationViewPreviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

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

export { VacancyLocationViewPreview }
