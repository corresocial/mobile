import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, MapArea, NavigationApps, TextAddress, TouchableApp } from './styles'
import MapPointIcon from '../../../assets/icons/mapPoint.svg'
import MapPointOrangeIcon from '../../../assets/icons/mapPoint-orange.svg'
import WazeIcon from '../../../assets/icons/waze.svg'
import GoogleMapsIcon from '../../../assets/icons/googleMaps.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { CompleteAddress, LocationViewType, PostType } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { CustomMapView } from '../../CustomMapView'
import { getPrivateAddress } from '../../../services/firebase/post/getPrivateAddress'

interface LocationViewCardProps {
	title: string
	locationView?: LocationViewType
	postType: PostType
	postId: string
	textFontSize?: number
}

function LocationViewCard({
	title,
	locationView,
	postType,
	postId,
	textFontSize = 12
}: LocationViewCardProps) {
	const [completeAddress, setCompleteAddress] = useState<CompleteAddress>({})

	useEffect(() => {
		if (locationView !== 'private') {
			loadRemotePrivateAddress()
		}
	}, [])

	const loadRemotePrivateAddress = async () => {
		const address = await getPrivateAddress(postType, postId)
		setCompleteAddress(address)
	}

	const renderFormatedAddress = () => {
		if (locationView === 'private') {
			return showMessageWithHighlight('localização privada', ['privada'])
		}
		const textAddress = formatAddress()
		return textAddress
	}

	const formatAddress = () => {
		const {
			street,
			number,
			district,
			city,
			state,
		} = completeAddress
		return `${street}, ${number}, ${city}, ${state}`
	}

	const goToGoogleMapsApp = async () => {
		if (Object.keys(completeAddress).length < 1) return false
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&travelmode=driving&query=${completeAddress.coordinates?.latitude},${completeAddress.coordinates?.longitude}&waypoints=${completeAddress.coordinates?.latitude},${completeAddress.coordinates?.longitude}&zoom=21`
		const supportedLink = await Linking.canOpenURL(googleMapsUrl)
		if (!supportedLink) {
			console.log('localização inválida')
			return false
		}
		await Linking.openURL(googleMapsUrl)
	}

	const goToWazeApp = async () => {
		if (Object.keys(completeAddress).length < 1) return false
		const wazeUrl = `https://waze.com/ul?ll=${completeAddress.coordinates?.latitude},${completeAddress.coordinates?.longitude}&z=17`
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
					title={title}
					SvgIcon={MapPointIcon}
					dimensions={30}
				/>
				<TextAddress style={{ fontSize: RFValue(textFontSize) }}>
					{renderFormatedAddress()}
				</TextAddress>
			</CardHeader>
			{
				locationView !== 'private' && (
					<MapArea >
						<CustomMapView
							regionCoordinate={{
								latitude: -23.318759913934052,
								longitude: -51.16604430601001,
								latitudeDelta: 0.0065,
								longitudeDelta: 0.0065
							}}
							markerCoordinate={{
								latitude: -23.318759913934052,
								longitude: -51.16604430601001,
								latitudeDelta: 0.0028,
								longitudeDelta: 0.0028
							}}
							CustomMarker={MapPointOrangeIcon}
							locationView={locationView}
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
