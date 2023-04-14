import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { convertGeocodeToAddress } from '../../../services/maps/addressFormatter'

import { InsertServicePrestationLocationScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { Coordinates } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'

function InsertServicePrestationLocation({ route, navigation }: InsertServicePrestationLocationScreenProps) {
	const { serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = serviceDataContext

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
			setServiceDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('LocationViewPreview', {
			locationView,
			editMode: editModeIsTrue()
		})
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				searchPlaceholder={'digite o endereço do serviço'}
				locationView={locationView}
				postRange={postRange || 'near'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertServicePrestationLocation }
