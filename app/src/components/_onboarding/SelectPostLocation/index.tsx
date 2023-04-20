import React, { useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, LayoutRectangle, Platform, StatusBar, View } from 'react-native'
import * as Location from 'expo-location'

import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { ButtonContainer, ButtonContainerBottom, Container, MapContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import MapPointWhiteIcon from '../../../assets/icons/mapPoint-white.svg'
import MapPointOrangeIcon from '../../../assets/icons/mapPoint-orange.svg'

import { generateLocationHeaderText, getPossessivePronoun, getRelativeLocationView, getRelativeRange } from '../../../utils/locationMessages'

import { Coordinates, LatLong, LocationViewType, PostRange } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { InstructionCard } from '../../_cards/InstructionCard'

const initialRegion = {
	latitude: -13.890303625634541,
	latitudeDelta: 55.54596047458735,
	longitude: -51.92523987963795,
	longitudeDelta: 49.99996047466992,
}

const defaultDeltaCoordinates = {
	latitudeDelta: 0.003,
	longitudeDelta: 0.003
}

interface SelectPostLocationProps {
	backgroundColor: string
	validationColor: string
	searchPlaceholder: string
	locationView: LocationViewType
	postRange: PostRange
	initialValue?: LatLong
	navigateBackwards: () => void
	saveLocation: (markerCoordinate: Coordinates) => void
}

function SelectPostLocation({
	backgroundColor,
	validationColor,
	searchPlaceholder,
	locationView,
	postRange,
	initialValue,
	saveLocation,
	navigateBackwards
}: SelectPostLocationProps) {
	const [hasPermission, setHasPermission] = useState(false)
	const [markerCoordinate, setMarkerCoordinate] = useState<Coordinates | null>(null)
	const [address, setAddress] = useState('')

	const [mapContainerDimensions, setMapContainerDimensions] = useState<LayoutRectangle>({
		width: 0, height: 0, x: 0, y: 0
	})
	const [validAddress, setValidAddress] = useState(false)
	const [invalidAddressAfterSubmit, setInvalidAddressAfterSubmit] = useState<boolean>(false)

	useEffect(() => {
		if (initialValue?.latitude && initialValue?.longitude) {
			setMarkerCoordinate({ ...defaultDeltaCoordinates, ...initialValue })
		}
	}, [])

	const requestLocationPermission = async () => {
		const locationPermission = await Location.requestForegroundPermissionsAsync()
		setHasPermission(locationPermission.granted)
		return locationPermission.granted || hasPermission
	}

	const someInvalidFieldSubimitted = () => invalidAddressAfterSubmit

	const validateAddress = (text: string) => {
		setInvalidAddressAfterSubmit(false)
		setValidAddress(false)
		return validAddress
	}

	const getCurrentPositionCoordinated = async () => {
		const permission = await requestLocationPermission()
		if (!permission) return

		const currentPositionCoordinate = await Location.getCurrentPositionAsync()
		const geolocationCoordinates = {
			latitude: currentPositionCoordinate.coords.latitude,
			longitude: currentPositionCoordinate.coords.longitude
		}

		setMarkerCoordinate({
			...defaultDeltaCoordinates,
			...geolocationCoordinates,
		})
		setValidAddress(false)
		setAddress('')

		convertGeocodeToAddress(
			geolocationCoordinates.latitude,
			geolocationCoordinates.longitude
		)
	}

	const getAddressCoordinates = async () => {
		const permission = await requestLocationPermission()
		if (!permission) return

		const addressGeolocation = await Location.geocodeAsync(address)

		if (!addressGeolocation.length) {
			setInvalidAddressAfterSubmit(true)
			setMarkerCoordinate(null)
			return
		}

		const geolocationCoordinates = {
			latitude: addressGeolocation[0].latitude,
			longitude: addressGeolocation[0].longitude,
		}

		setMarkerCoordinate({
			...defaultDeltaCoordinates,
			...geolocationCoordinates,
		})

		convertGeocodeToAddress(
			addressGeolocation[0].latitude,
			addressGeolocation[0].longitude
		)

		setValidAddress(true)
	}

	const convertGeocodeToAddress = async (latitude: number, longitude: number) => {
		const geocodeAddress = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		})

		const structuredAddress = structureAddress(geocodeAddress)
		setInvalidAddressAfterSubmit(false)

		return structuredAddress
	}

	const structureAddress = (geocodeAddress: Location.LocationGeocodedAddress[]) => ({
		country: geocodeAddress[0].country || '',
		state: geocodeAddress[0].region || '',
		city: geocodeAddress[0].city || geocodeAddress[0].subregion || '',
		postalCode: geocodeAddress[0].postalCode || '',
		street: geocodeAddress[0].street || '',
		number: geocodeAddress[0].streetNumber || geocodeAddress[0].name || '',
		district: geocodeAddress[0].district === geocodeAddress[0].subregion ? 'Centro' : geocodeAddress[0].district || '',
		coordinates: {
			latitude: markerCoordinate?.latitude,
			longitude: markerCoordinate?.longitude
		}
	})

	const updateMarkerPosition = async (coordinates: Coordinates) => {
		setMarkerCoordinate(coordinates)
		markerCoordinate && setInvalidAddressAfterSubmit(false)
	}

	const markerCoordinateIsAccuracy = () => markerCoordinate?.latitudeDelta as number < 0.0065

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted()

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [backgroundColor, theme.red2],
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(14)}
				relativeHeight={relativeScreenHeight(14)}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
				borderBottomWidth={0}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'qual é o endereço?'}
					highlightedWords={['endereço']}
					fontSize={17}
				/>
			</DefaultHeaderContainer>
			<LineInput
				value={address}
				relativeWidth={'100%'}
				defaultBackgroundColor={validAddress ? validationColor : theme.white3}
				defaultBorderBottomColor={validAddress ? theme.black4 : theme.black4}
				validBackgroundColor={validationColor}
				validBorderBottomColor={theme.black4}
				invalidBackgroundColor={theme.red1}
				invalidBorderBottomColor={theme.red5}
				textAlign={'left'}
				invalidTextAfterSubmit={invalidAddressAfterSubmit}
				fontSize={16}
				placeholder={searchPlaceholder || 'digite o endereço do post'}
				keyboardType={'default'}
				returnKeyType={'search'}
				onPressKeyboardSubmit={getAddressCoordinates}
				textIsValid={validAddress}
				validateText={(text: string) => validateAddress(text)}
				onChangeText={(text: string) => {
					setAddress(text)
					setInvalidAddressAfterSubmit(false)
				}}
			/>
			<MapContainer onLayout={({ nativeEvent }: LayoutChangeEvent) => !mapContainerDimensions.width && setMapContainerDimensions(nativeEvent.layout)}>
				<View style={{
					position: 'absolute',
					top: mapContainerDimensions.height / 2 - (relativeScreenWidth(9.72)),
					left: mapContainerDimensions.width / 2 - ((relativeScreenWidth(9.72)) / 2),
					zIndex: 3
				}}
				>
					<MapPointOrangeIcon width={relativeScreenWidth(9.72)} height={relativeScreenWidth(9.72)} />
				</View>
				<ButtonContainer>
					<PrimaryButton
						relativeHeight={relativeScreenHeight(8)}
						minHeight={50}
						flexDirection={'row-reverse'}
						color={theme.white3}
						label={'usar minha localização'}
						highlightedWords={['minha', 'localização']}
						labelColor={theme.black4}
						fontSize={16}
						SvgIcon={MapPointWhiteIcon}
						svgIconScale={['60%', '15%']}
						onPress={getCurrentPositionCoordinated}
					/>
				</ButtonContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate || initialRegion}
					markerCoordinate={null}
					CustomMarker={MapPointWhiteIcon}
					updateMarkerPosition={updateMarkerPosition}
				/>
			</MapContainer>
			{
				markerCoordinate && markerCoordinateIsAccuracy()
				&& (
					<ButtonContainerBottom>
						<PrimaryButton
							flexDirection={'row-reverse'}
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SvgIcon={CheckWhiteIcon}
							svgIconScale={['40%', '25%']}
							onPress={() => saveLocation(markerCoordinate)}
						/>
					</ButtonContainerBottom>
				)
			}
		</Container>
	)
}

export { SelectPostLocation }
