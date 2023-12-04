import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { CultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { theme } from '@common/theme'

import { PostLocationViewPreview } from '../../../components/_onboarding/PostLocationViewPreview'
import { CultureLocationViewPreviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function CultureLocationViewPreview({ navigation, route }: CultureLocationViewPreviewScreenProps) {
	const { cultureDataContext } = useContext(CultureContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = cultureDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getCurrentMarkerCoordinate = () => {
		if (editModeIsTrue()) {
			return {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
		}

		return {
			...cultureDataContext?.location?.coordinates,
			...defaultDeltaCoordinates
		}
	}

	const saveLocationView = async () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView })
			navigation.pop(2)
			navigation.goBack()
			return
		}

		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditCulturePostReview',
				params: {
					postData: {
						...cultureDataContext,
						locationView,
						repeat: 'unrepeatable'
					},
					unsavedPost: true,
					showPresentationModal: true
				}
			}]
		})
	}

	const getPostRange = () => {
		if (editModeIsTrue()) {
			return cultureDataContext.range || 'near'
		}

		return postRange || 'near'
	}

	const getPlaceName = () => {
		switch (getPostRange()) {
			case 'near': return 'near'
			case 'city': return editModeIsTrue() ? editDataContext.unsaved.location?.city : cultureDataContext.location?.city
			case 'country': return 'Brasil'
			default: return ''
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostLocationViewPreview
				backgroundColor={theme.blue2}
				saveLocationView={saveLocationView}
				initialValue={getCurrentMarkerCoordinate()}
				postRange={getPostRange()}
				placeName={getPlaceName()}
				placeColor={theme.transparence.blue3}
				locationViewSelected={route.params.locationView}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { CultureLocationViewPreview }
