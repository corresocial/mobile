import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PollEntity } from '@domain/poll/entity/types'
import { Coordinates } from '@domain/post/entity/types'

import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollLocationScreenProps } from '@routes/Stack/PollStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

function InsertPollLocation({ navigation }: InsertPollLocationScreenProps) {
	const { pollDataContext, setPollDataOnContext } = useContext(PollRegisterContext)

	const saveLocation = async (markerCoordinate: Coordinates) => {
		const coordinates = {
			latitude: markerCoordinate.latitude,
			longitude: markerCoordinate.longitude
		}

		const geocodeAddress = await getReverseGeocodeByMapsApi(coordinates.latitude, coordinates.longitude)
		const completeAddress = structureAddress(geocodeAddress, coordinates.latitude, coordinates.longitude)
		const geohashObject = generateGeohashes(coordinates.latitude, coordinates.longitude)

		const pollLocation: PollEntity['location'] = { ...completeAddress, ...geohashObject }

		setPollDataOnContext({ location: pollLocation })
		// navigation.navigate('EditPoll', { pollData: { ...pollDataContext, location: pollLocation }, unsavedPoll: true })
		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditPoll',
				params: { pollData: { ...pollDataContext, location: pollLocation }, unsavedPoll: true }
			}],
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<SelectPostLocation
				customTitle={'onde você quer publicar essa enquete?'}
				customTitleHighligh={['onde', 'enquete']}
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertPollLocation }
