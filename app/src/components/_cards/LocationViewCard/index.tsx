import React from 'react'
import { Linking } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, MapArea, NavigationApps, TextAddress, TouchableApp } from './styles'
import MapPointWhiteIcon from '../../../assets/icons/mapPoint-white.svg'
import PencilIcon from '../../../assets/icons/pencil.svg'
import MapPointOrangeIcon from '../../../assets/icons/mapPoint-orange.svg'
import WazeIcon from '../../../assets/icons/waze.svg'
import GoogleMapsIcon from '../../../assets/icons/googleMaps.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { Location, LocationViewType } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { CustomMapView } from '../../CustomMapView'

interface LocationViewCardProps {
	title?: string
	online?: boolean
	locationView?: LocationViewType
	textFontSize?: number
	withoutMapView?: boolean
	editable?: boolean
	location: Location
	onEdit?: () => void
}

function LocationViewCard({
	title,
	online,
	locationView,
	textFontSize = 14,
	withoutMapView,
	editable,
	location,
	onEdit
}: LocationViewCardProps) {
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

		if (locationView === 'approximate') return

		return (
			<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
				{formatAddress()}
			</TextAddress>
		)
	}

	const formatAddress = () => {
		const {
			street,
			number,
			city,
			state,
		} = location
		return `${street && `${street},`}${number && `${number},`}${city && `${city},`}${state}`
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
		if (Object.keys(location).length < 1) return false
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
		const approximateRadius = 125

		const binaryRandom = Math.round(Math.random())
		const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000
		if (binaryRandom) {
			return (approximateRadius * detachmentRandom)
		}
		return -(approximateRadius * detachmentRandom)
	}

	const goToWazeApp = async () => {
		if (Object.keys(location).length < 1) return false
		const wazeUrl = `https://waze.com/ul?ll=${location.coordinates?.latitude},${location.coordinates?.longitude}&z=17`
		const supportedLink = await Linking.canOpenURL(wazeUrl)
		if (!supportedLink) {
			console.log('localização inválida')
			return false
		}
		await Linking.openURL(wazeUrl)
	}

	return (
		<DefaultCardContainer withoutPadding>
			<CardHeader>
				<DefaultHeaderTitle
					title={title || 'local do post'}
					onPressIcon={onEdit && onEdit}
					SvgIcon={editable ? PencilIcon : MapPointWhiteIcon}
					dimensions={editable ? 20 : 32}
					invertTextAndIcon={editable}
					justifyContent={editable ? 'space-between' : 'flex-start'}
				/>
				{renderFormatedAddress()}
			</CardHeader>
			{
				((locationView !== 'private' || editable) && locationView !== undefined) && !withoutMapView && (
					<MapArea >
						<CustomMapView
							scrollEnabled={false}
							regionCoordinate={getAddressCoordinates()}
							markerCoordinate={getAddressCoordinates()}
							CustomMarker={locationView === 'public' || (locationView === 'private' && editable) ? MapPointOrangeIcon : undefined}
							locationView={locationView === 'private' && editable ? 'public' : locationView}
						/>
						<NavigationApps >
							<TouchableApp onPress={goToGoogleMapsApp}>
								<GoogleMapsIcon width={RFValue(30)} height={RFValue(30)} />
							</TouchableApp>
							<TouchableApp onPress={goToWazeApp} >
								<WazeIcon width={RFValue(40)} height={RFValue(40)} />
							</TouchableApp>
						</NavigationApps>
					</MapArea>
				)
			}
		</DefaultCardContainer>
	)
}

export { LocationViewCard }
