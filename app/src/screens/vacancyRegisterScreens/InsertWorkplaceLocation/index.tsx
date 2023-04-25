import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { convertGeocodeToAddress } from '../../../services/maps/addressFormatter'

import { InsertWorkplaceLocationScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { Coordinates } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'

function InsertWorkplaceLocation({ route, navigation }: InsertWorkplaceLocationScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = vacancyDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocation = async (markerCoordinate: Coordinates) => {
		if (!markerCoordinateIsAccuracy(markerCoordinate)) return

		const completeAddress = await convertGeocodeToAddress(markerCoordinate?.latitude as number, markerCoordinate?.longitude as number)
		const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				locationView: 'public',
				location: {
					...completeAddress,
					...geohashObject
				}
			})
			navigation.goBack()
			return
		}
		setVacancyDataOnContext({
			location: {
				...completeAddress,
				...geohashObject
			}
		})

		navigation.navigate('VacancyLocationViewPreview', {
			locationView,
			editMode: editModeIsTrue()
		})
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				searchPlaceholder={'digite o endereço da vaga'}
				locationView={locationView}
				postRange={postRange || 'near'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertWorkplaceLocation }
