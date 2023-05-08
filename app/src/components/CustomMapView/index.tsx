import React, { useEffect, useState } from 'react'
import MapView, { Circle, Marker, Polygon } from 'react-native-maps'
import { SvgProps } from 'react-native-svg'

import { relativeScreenWidth } from '../../common/screenDimensions'

import { Coordinates, LatLong, LocationViewType, PostRange } from '../../services/firebase/types'
import { getPlaceLimits } from '../../services/maps/getPlaceLimits'
import { theme } from '../../common/theme'

type PlaceLimits = {
	northeast: { lat: number, lng: number },
	southwest: { lat: number, lng: number }
}

interface CustomMapViewProops {
	regionCoordinate: Coordinates | any
	markerCoordinate: Coordinates | any
	renderLimits?: boolean
	postRange?: PostRange
	placeColor?: string,
	placeName?: string,
	scrollEnabled?: boolean
	CustomMarker?: React.FC<SvgProps>
	locationView?: LocationViewType
	updateMarkerPosition?: (event: any) => void
}

function CustomMapView({
	regionCoordinate,
	markerCoordinate,
	renderLimits,
	postRange,
	placeColor,
	placeName,
	scrollEnabled = true,
	CustomMarker,
	locationView = 'private',
	updateMarkerPosition

}: CustomMapViewProops) {
	const [rangeCoordinates, setRangeCoordinates] = useState<LatLong[]>([markerCoordinate])
	const [randomCoordinate, setRandomCoordinates] = useState<LatLong>()

	const approximateRadius = 250

	useEffect(() => {
		getRangeLimits()
		getRandomCoordinates()
	}, [])

	const getRandomCoordinates = () => {
		const randomLatLng = generateRandomCoordinateOnRadius()
		setRandomCoordinates(randomLatLng as any) // TODO Type
	}

	const getRangeLimits = async () => {
		if (placeName || placeName === 'near') {
			if (postRange === 'near') {
				setRangeCoordinates(nearByCoordinates())
				return
			}

			const limits = await getPlaceLimits(placeName)
			if (!limits) return false

			setRangeCoordinates(ordenateCoordinates(limits))
		}
	}

	const nearByCoordinates = () => {
		return [
			{
				latitude: markerCoordinate.latitude - 0.0027,
				longitude: markerCoordinate.longitude - 0.006
			},
			{
				latitude: markerCoordinate.latitude + 0.0027,
				longitude: markerCoordinate.longitude - 0.006
			},
			{
				latitude: markerCoordinate.latitude + 0.0027,
				longitude: markerCoordinate.longitude + 0.006
			},
			{
				latitude: markerCoordinate.latitude - 0.0027,
				longitude: markerCoordinate.longitude + 0.006
			}
		]
	}

	const ordenateCoordinates = ({ northeast, southwest }: PlaceLimits) => {
		return [
			{
				latitude: northeast.lat,
				longitude: northeast.lng
			},
			{
				latitude: southwest.lat,
				longitude: northeast.lng
			},
			{
				latitude: southwest.lat,
				longitude: southwest.lng
			},
			{
				latitude: northeast.lat,
				longitude: southwest.lng
			}
		]
	}

	const getRegionCoordinates = () => {
		if (!renderLimits || !rangeCoordinates || !rangeCoordinates[0] || rangeCoordinates.length < 3) return regionCoordinate

		const latDiff = rangeCoordinates[0].latitude - rangeCoordinates[2].latitude
		const lgnDiff = rangeCoordinates[0].longitude - rangeCoordinates[2].longitude
		const customLatLng = {
			latitude: rangeCoordinates[0].latitude - (latDiff / 2),
			longitude: rangeCoordinates[0].longitude - (lgnDiff / 2),
		}

		const customCityDelta = (latDiff * 1.1 + (lgnDiff < 0.35 ? 0 : lgnDiff / 1.8))

		if (rangeCoordinates.length && postRange === 'country') return { ...regionCoordinate, latitudeDelta: 55, longitudeDelta: 55 }
		if (rangeCoordinates.length && postRange === 'city') return { ...customLatLng, latitudeDelta: customCityDelta, longitudeDelta: customCityDelta }
		return { ...regionCoordinate, latitudeDelta: 0.014, longitudeDelta: 0.014 }
	}

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

	return (
		<MapView
			style={{
				flex: 1,
				position: 'relative'
			}}
			cacheEnabled={false}
			scrollEnabled={scrollEnabled}
			pitchEnabled={scrollEnabled}
			zoomEnabled={scrollEnabled}
			region={locationView === 'approximate' && !renderLimits ? randomCoordinate : getRegionCoordinates()}
			mapType={'standard'}
			onRegionChangeComplete={(coordinates, details) => (!!details?.isGesture && updateMarkerPosition) && updateMarkerPosition(coordinates)}
		>
			{
				markerCoordinate
				&& (
					<>
						{
							locationView === 'approximate' && !renderLimits
							&& (
								<Circle
									center={{
										latitude: randomCoordinate?.latitude || 0,
										longitude: randomCoordinate?.longitude || 0
									}}
									radius={approximateRadius}
									strokeWidth={4}
									fillColor={'transparent'}
								>
								</Circle>
							)
						}
						{
							renderLimits
							&& (
								<Polygon
									coordinates={rangeCoordinates}
									fillColor={placeColor || 'rgba(250, 153, 56, 0.25)'}
									strokeWidth={5}
									strokeColor={theme.black4}
								/>
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
