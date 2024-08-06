import React from 'react'
import { Linking } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { LocationViewType, PostEntityCommonFields } from '@domain/post/entity/types'

import { CardHeader, CardHeaderContainer, Container, MapArea, NavigationApps, TextAddress, TouchableApp } from './styles'
import GoogleMapsIcon from '@assets/icons/googleMaps.svg'
import MapPointOrangeIcon from '@assets/icons/mapPoint-orange.svg'
import WazeIcon from '@assets/icons/waze.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'

import { CustomMapView } from '@components/CustomMapView'
import { IconComponent } from '@newComponents/IconComponent'

interface MapViewProps {
	online?: boolean
	locationView?: LocationViewType
	textFontSize?: number
	withoutMapView?: boolean
	location: PostEntityCommonFields['location']
	onEdit?: () => void
}

function MapView({
	online,
	locationView,
	textFontSize = 14,
	withoutMapView,
	location,
	onEdit
}: MapViewProps) {
	const renderFormatedAddress = () => {
		if (withoutMapView) {
			return (
				<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
					{showMessageWithHighlight('localização não definida', ['não', 'definida'])}
				</TextAddress>
			)
		}

		if (online) {
			return (
				<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
					{'online'}
				</TextAddress>
			)
		}

		if (!locationView) {
			return (
				<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
					{showMessageWithHighlight('localização indisponível', ['indisponível'])}
				</TextAddress>
			)
		}

		if (locationView === 'private') {
			return (
				<>
					<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
						{showMessageWithHighlight('localização privada', ['privada'])}
					</TextAddress>
				</>
			)
		}

		if (locationView === 'approximate') {
			return (
				<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
					{showMessageWithHighlight('localização aproximada', ['aproximada'])}
				</TextAddress>
			)
		}
		if (!location.city) return

		return (
			<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
				{formatAddress()}
			</TextAddress>
		)
	}

	const formatAddress = () => {
		const {
			street,
			district,
			city,
			state,
			name,
			number
		} = location
		// CURRENT Ajustar operadores
		return `${name ? `${name} , \n` : ''}${street && `${street}, `}${number && `${number}, `}${district && `${district}`}${city && ` - ${city}, `}${state}`
	}

	const getAddressCoordinates = () => {
		if (!location || !Object.keys(location).length) {
			return ({
				latitude: -23.318759913934052,
				longitude: -51.16604430601001,
				latitudeDelta: 0.0065,
				longitudeDelta: 0.0065
			})
		}
		return {
			latitude: location.coordinates?.latitude,
			longitude: location.coordinates?.longitude,
			latitudeDelta: 0.0028,
			longitudeDelta: 0.0028
		}
	}

	const goToGoogleMapsApp = async () => {
		if (!Object.keys(location).length) return false
		const googleMapsUrl = getGoogleMapUrl()
		const supportedLink = await Linking.canOpenURL(googleMapsUrl)
		if (!supportedLink) {
			console.log('localização inválida')
			return false
		}
		await Linking.openURL(googleMapsUrl)
	}

	const getGoogleMapUrl = () => {
		if (locationView === 'approximate') {
			return `https://www.google.com/maps/@?api=1&map_action=map&center=${location.coordinates?.latitude || 0 + getRandomDetachment()},${location.coordinates?.longitude || 0 + getRandomDetachment()}&zoom=17`
		}
		return `https://www.google.com/maps/search/?api=1&travelmode=driving&query=${location.coordinates?.latitude},${location.coordinates?.longitude}&waypoints=${location.coordinates?.latitude},${location.coordinates?.longitude}&zoom=17`
	}

	const getRandomDetachment = () => {
		const approximateRadius = 400

		const binaryRandom = Math.round(Math.random())
		const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000
		if (binaryRandom) {
			return (approximateRadius * detachmentRandom)
		}
		return -(approximateRadius * detachmentRandom)
	}

	const goToWazeApp = async () => {
		if (!Object.keys(location).length) return false
		const wazeUrl = `https://waze.com/ul?ll=${location.coordinates?.latitude},${location.coordinates?.longitude}&z=17`
		const supportedLink = await Linking.canOpenURL(wazeUrl)
		if (!supportedLink) {
			console.log('localização inválida')
			return false
		}
		await Linking.openURL(wazeUrl)
	}

	// CURRENT Trocar ocorrência de ícones por IconComponent
	return (
		<Container >
			<CardHeaderContainer>
				<CardHeader>
					<IconComponent iconName={'mapPoint'} relativeHeight={25} relativeWidth={40} />
					{renderFormatedAddress()}
				</CardHeader>
			</CardHeaderContainer>
			{
				((locationView !== 'private' || onEdit) && locationView !== undefined) && !withoutMapView && (
					<MapArea >
						<CustomMapView
							scrollEnabled={false}
							regionCoordinate={getAddressCoordinates()}
							markerCoordinate={getAddressCoordinates()}
							CustomMarker={locationView === 'public' || (locationView === 'private' && onEdit) ? MapPointOrangeIcon : undefined}
							locationView={locationView === 'private' && onEdit ? 'public' : locationView}
						/>
						<NavigationApps >
							<TouchableApp onPress={goToGoogleMapsApp}>
								<GoogleMapsIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
							</TouchableApp>
							<TouchableApp onPress={goToWazeApp} >
								<WazeIcon width={relativeScreenDensity(40)} height={relativeScreenDensity(40)} />
							</TouchableApp>
						</NavigationApps>
					</MapArea>
				)
			}
		</Container>
	)
}

export { MapView }
