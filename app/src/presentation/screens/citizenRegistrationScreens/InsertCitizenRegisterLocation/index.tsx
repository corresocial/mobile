import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { CitizenRegisterLocation } from '@domain/citizenRegister/model/entities/types'
import { PollEntity } from '@domain/poll/entity/types'
import { Coordinates } from '@domain/post/entity/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertCitizenRegisterLocationScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

const { getCurrentLocation } = useLocationService()

function InsertCitizenRegisterLocation({ route, navigation }: InsertCitizenRegisterLocationScreenProps) {
	const { citizenRegistrationIdentifier, saveCitizenRegistrationIdentifier } = useCitizenRegistrationContext()

	const [currentLocation, setCurrentLocation] = useState<CitizenRegisterLocation>()

	useEffect(() => {
		loadCurrentLocation()
	}, [])

	const loadCurrentLocation = async () => {
		const location = await getCurrentLocation()
		setCurrentLocation({
			coordinates: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			}
		} as CitizenRegisterLocation)
	}

	const saveLocation = async (markerCoordinate: Coordinates) => {
		const coordinates = {
			latitude: markerCoordinate.latitude,
			longitude: markerCoordinate.longitude
		}

		const geocodeAddress = await getReverseGeocodeByMapsApi(coordinates.latitude, coordinates.longitude)
		const completeAddress = structureAddress(geocodeAddress, coordinates.latitude, coordinates.longitude)
		const geohashObject = generateGeohashes(coordinates.latitude, coordinates.longitude)

		const citizenRegisterLocation: PollEntity['location'] = { ...completeAddress, ...geohashObject }

		console.log(citizenRegisterLocation)
		saveCitizenRegistrationIdentifier({ location: citizenRegisterLocation })
		navigation.goBack()
	}

	const getInitialCoordinateValue = () => {
		if (citizenRegistrationIdentifier.location?.coordinates) {
			return citizenRegistrationIdentifier.location?.coordinates
		}

		console.log(currentLocation)
		if (currentLocation) return currentLocation.coordinates

		// return { latitude: 11, longitude: 11 }
	}

	return (
		<>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<SelectPostLocation
				customTitle={'onde mora esse cidadão?'}
				customTitleHighligh={['onde', 'enquete']}
				backgroundColor={theme.orange2}
				initialValue={getInitialCoordinateValue()}
				validationColor={theme.orange1}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertCitizenRegisterLocation }
