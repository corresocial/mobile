import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { convertGeocodeToAddress } from '../../../services/maps/addressFormatter'

import { InsertSocialImpactLocationScreenProps } from '../../../routes/Stack/socialImpactStack/stackScreenProps'
import { Coordinates } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'

function InsertSocialImpactLocation({ route, navigation }: InsertSocialImpactLocationScreenProps) {
	const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { locationView } = route.params
	const { range: postRange } = socialImpactDataContext

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
			setSocialImpactDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('SocialImpactLocationViewPreview', {
			locationView: route.params.locationView,
			editMode: !!route.params?.editMode
		})
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				searchPlaceholder={'digite o endereço da iniciativa'}
				locationView={locationView}
				postRange={postRange || 'near'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertSocialImpactLocation }
