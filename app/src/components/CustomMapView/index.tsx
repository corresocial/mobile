import React from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { SvgProps } from 'react-native-svg'

import { relativeScreenWidth } from '../../common/screenDimensions'

import { Coordinates, LocationViewType } from '../../services/firebase/types'

interface CustomMapViewProops {
	regionCoordinate: Coordinates | any
	markerCoordinate: Coordinates | any
	CustomMarker?: React.FC<SvgProps>
	locationView?: LocationViewType
	updateMarkerPosition?: (event: any) => void
}

function CustomMapView({
	regionCoordinate,
	markerCoordinate,
	CustomMarker,
	locationView = 'private',
	updateMarkerPosition

}: CustomMapViewProops) {
	const approximateRadius = 250

	const generateRandomCoordinateOnRadius = () => {
		if (!locationView) return null

		const realCoordinates = {
			...markerCoordinate
		} as Coordinates

		const newCoordinates = {
			latitudeDelta: 0.006,
			longitudeDelta: 0.006,
			latitude: realCoordinates.latitude + getRandomDetachment(),
			longitude: realCoordinates.longitude + getRandomDetachment()
		}

		return newCoordinates as Coordinates
	}

	const getRandomDetachment = () => {
		const binaryRandom = Math.round(Math.random())
		const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000
		if (binaryRandom) {
			return (approximateRadius * detachmentRandom)
		}
		return -(approximateRadius * detachmentRandom)
	}

	const randomCoordinate = generateRandomCoordinateOnRadius()

	return (
		<MapView
			style={{
				flex: 1,
				position: 'relative'
			}}
			cacheEnabled={false}
			region={locationView === 'approximate' ? randomCoordinate as Coordinates : regionCoordinate}
			mapType={'standard'}
			onRegionChangeComplete={(coordinates, details) => (!!details?.isGesture && updateMarkerPosition) && updateMarkerPosition(coordinates)}
		>
			{
				markerCoordinate
				&& (
					<>
						{
							locationView === 'approximate'
							&& (
								<Circle
									center={{
										latitude: randomCoordinate?.latitude || 0,
										longitude: randomCoordinate?.longitude || 0
									}}
									radius={approximateRadius}
									strokeWidth={4}
									fillColor={'rgba(250, 153, 56, 0.25)'}
								>
								</Circle>
							)
						}
						{
							CustomMarker && (
								<Marker
									coordinate={locationView === 'approximate' ? randomCoordinate : markerCoordinate}
								>
									{<CustomMarker width={relativeScreenWidth(9.72)} height={relativeScreenWidth(9.72)} />}
								</Marker>
							)
						}
					</>
				)

			}
		</MapView>
	)
}

export { CustomMapView }
