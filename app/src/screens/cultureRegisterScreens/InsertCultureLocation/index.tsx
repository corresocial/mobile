import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'

import { InsertCultureLocationScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { Coordinates } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'
import { convertGeocodeToAddress } from '../../../services/maps/addressFormatter'

function InsertCultureLocation({ route, navigation }: InsertCultureLocationScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = cultureDataContext

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocation = async (markerCoordinate: Coordinates) => {
		if (!markerCoordinateIsAccuracy(markerCoordinate)) return

		const completeAddress = await convertGeocodeToAddress(markerCoordinate?.latitude as number, markerCoordinate?.longitude as number)
		const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		} else {
			setCultureDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('CultureLocationViewPreview', {
			locationView: route.params.locationView,
			editMode: !!route.params?.editMode
		})
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				searchPlaceholder={'digite o endereço do rolê'}
				locationView={locationView}
				postRange={postRange || 'near'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertCultureLocation }
