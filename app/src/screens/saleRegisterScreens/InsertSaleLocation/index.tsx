import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { convertGeocodeToAddress } from '../../../services/maps/addressFormatter'

import { InsertSaleLocationScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'
import { Coordinates } from '../../../services/firebase/types'

function InsertSaleLocation({ route, navigation }: InsertSaleLocationScreenProps) {
	const { saleDataContext, setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = saleDataContext

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
			setSaleDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('SaleLocationViewPreview', {
			locationView: route.params.locationView,
			editMode: !!route.params?.editMode
		})
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				searchPlaceholder={'digite o endereço de venda'}
				locationView={locationView}
				postRange={postRange || 'near'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertSaleLocation }
