import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Coordinates } from '@domain/post/entity/types'

import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollLocationScreenProps } from '@routes/Stack/PollStack/screenProps'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

function InsertPollLocation({ navigation }: InsertPollLocationScreenProps) {
	const { setPollDataOnContext } = useContext(PollRegisterContext)

	const saveLocation = async (markerCoordinate: Coordinates) => {
		const coordinates = {
			latitude: markerCoordinate.latitude,
			longitude: markerCoordinate.longitude
		}

		const geohashObject = generateGeohashes(coordinates.latitude, coordinates.longitude)

		setPollDataOnContext({
			location: {
				coordinates: {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude
				},
				...geohashObject
			}
		})

		console.log({
			coordinates: {
				latitude: coordinates.latitude,
				longitude: coordinates.longitude
			},
			...geohashObject
		})

		navigation.navigate('EditPoll' as any) // TODO Type
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
