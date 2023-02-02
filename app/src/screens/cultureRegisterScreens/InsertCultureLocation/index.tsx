import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, LayoutRectangle, Platform, StatusBar, View } from 'react-native'
import * as Location from 'expo-location'

import { theme } from '../../../common/theme'
import { relativeScreenHeight, screenWidth } from '../../../common/screenDimensions'
import { ButtonContainer, ButtonContainerBottom, Container, MapContainer } from './styles'
import Check from '../../../assets/icons/check.svg'
import MapPointOrange from '../../../assets/icons/mapPoint-orange.svg'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { getLocationViewTitle, getLocationViewDescription, getLocationViewHighlightedWords } from '../../../utils/locationMessages'

import { InsertCultureLocationScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { Coordinates, Id } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { LineInput } from '../../../components/LineInput'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { getPrivateAddress } from '../../../services/firebase/post/getPrivateAddress'

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

function InsertCultureLocation({ route, navigation }: InsertCultureLocationScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [hasPermission, setHasPermission] = useState(false)
	const [markerCoordinate, setMarkerCoordinate] = useState<Coordinates | null>(null)
	const [address, setAddress] = useState('')

	const [mapContainerDimensions, setMapContainerDimensions] = useState<LayoutRectangle>({
		width: 0, height: 0, x: 0, y: 0
	})
	const [validAddress, setValidAddress] = useState(false)
	const [invalidAddressAfterSubmit, setInvalidAddressAfterSubmit] = useState<boolean>(false)

	useEffect(() => {
		if (editModeIsTrue()) {
			getLocationByPostId()
		}
	}, [])

	const getLocationByPostId = async () => {
		const privateAddress = await getPrivateAddress('culture', route.params?.initialValue as Id)
		setMarkerCoordinate({ ...defaultDeltaCoordinates, ...privateAddress.coordinates })
	}

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

	const saveLocation = async () => {
		if (!markerCoordinateIsAccuracy()) return

		const completeAddress = await convertGeocodeToAddress(markerCoordinate?.latitude as number, markerCoordinate?.longitude as number)
		const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				address: {
					...completeAddress,
					...geohashObject
				}
			})
		} else {
			setCultureDataOnContext({
				address: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('CultureLocationViewPreview', {
			locationView: route.params.locationView,
			editMode: !!route.params?.editMode
		})
	}

	const editModeIsTrue = () => route.params && route.params.editMode

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
			outputRange: [theme.blue2, theme.red2],
		})
	}

	const { locationView } = route.params

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(22)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={getLocationViewTitle(locationView, someInvalidFieldSubimitted())}
					titleFontSize={24}
					description={getLocationViewDescription(locationView, someInvalidFieldSubimitted())}
					highlightedWords={[...getLocationViewHighlightedWords(locationView, someInvalidFieldSubimitted())]}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<LineInput
				value={address}
				relativeWidth={'100%'}
				defaultBackgroundColor={validAddress ? theme.blue1 : theme.white3}
				defaultBorderBottomColor={validAddress ? theme.blue5 : theme.black4}
				validBackgroundColor={theme.blue1}
				validBorderBottomColor={theme.blue5}
				invalidBackgroundColor={theme.red1}
				invalidBorderBottomColor={theme.red5}
				textAlign={'left'}
				invalidTextAfterSubmit={invalidAddressAfterSubmit}
				fontSize={16}
				placeholder={'ex: rua, bairro, cidade, etc...'}
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
					top: mapContainerDimensions.height / 2 - (screenWidth * 0.0972),
					left: mapContainerDimensions.width / 2 - ((screenWidth * 0.0972) / 2),
					zIndex: 3
				}}
				>
					<MapPointOrange width={screenWidth * 0.0972} height={screenWidth * 0.0972} />
				</View>
				<ButtonContainer>
					<PrimaryButton
						relativeHeight={'10%'}
						minHeight={50}
						flexDirection={'row-reverse'}
						color={theme.white3}
						label={'usar minha localização'}
						highlightedWords={['minha', 'localização']}
						labelColor={theme.black4}
						fontSize={16}
						SvgIcon={MapPointOrange}
						svgIconScale={['60%', '15%']}
						onPress={getCurrentPositionCoordinated}
					/>
				</ButtonContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate || initialRegion}
					markerCoordinate={null}
					CustomMarker={MapPointOrange}
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
							SvgIcon={Check}
							svgIconScale={['30%', '15%']}
							onPress={saveLocation}
						/>
					</ButtonContainerBottom>
				)
			}
		</Container>
	)
}

export { InsertCultureLocation }
