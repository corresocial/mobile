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
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
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

		setVacancyDataOnContext({ locationView })
		navigation.navigate('SelectVacancyFrequency')
	}

	const getPlaceName = () => {
		switch (postRange) {
			case 'near': return 'near'
			case 'city': return vacancyDataContext.location?.city || ''
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
				postRange={postRange || 'near'}
				placeName={getPlaceName()}
				placeColor={theme.transparence.yellow3}
				locationViewSelected={route.params.locationView}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { VacancyLocationViewPreview }
