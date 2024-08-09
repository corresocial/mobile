import * as Location from 'expo-location'
import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, LayoutChangeEvent, LayoutRectangle, Platform, StatusBar, View } from 'react-native'

import { Coordinates, LatLong } from '@domain/post/entity/types'

import { LoaderContext } from '@contexts/LoaderContext'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { ButtonContainerBottom, Container, HeaderDescription, MapContainer, MyLocationButtonContainer, SearchInputContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import MapPointOrangeIcon from '@assets/icons/mapPoint-orange.svg'
import MapPointWhiteIcon from '@assets/icons/mapPoint-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

import { CustomMapView } from '../../CustomMapView'

const { getCurrentLocation, convertGeocodeToAddress, getCoordinatesByIpAddress } = useLocationService()
const { searchAddressByText } = useGoogleMapsService()
const { structureExpoLocationAddress } = UiLocationUtils()

const initialRegion = {
	latitude: -13.890303625634541,
	latitudeDelta: 3.54596047458735,
	longitude: -51.92523987963795,
	longitudeDelta: 3.99996047466992
}

const defaultDeltaCoordinates = {
	latitudeDelta: 0.003,
	longitudeDelta: 0.003
}

interface SelectPostLocationProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customTitleHighligh?: string[]
	initialValue?: LatLong
	isLoading?: boolean
	headerDescription?: string
	headerDescriptionHighlightedWords?: string[]
	navigateBackwards: () => void
	saveLocation: (markerCoordinate: Coordinates) => void
}

function SelectPostLocation({
	backgroundColor,
	validationColor,
	customTitle,
	customTitleHighligh,
	initialValue,
	headerDescription,
	headerDescriptionHighlightedWords,
	isLoading,
	saveLocation,
	navigateBackwards
}: SelectPostLocationProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [hasPermission, setHasPermission] = useState(false)
	const [markerCoordinate, setMarkerCoordinate] = useState<Coordinates | null>(initialRegion)
	const [address, setAddress] = useState('')

	const [mapContainerDimensions, setMapContainerDimensions] = useState<LayoutRectangle>({
		width: 0, height: 0, x: 0, y: 0
	})
	const [validAddress, setValidAddress] = useState(false)
	const [invalidAddressAfterSubmit, setInvalidAddressAfterSubmit] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		removeAllKeyboardEventListeners()
		Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
	}, [keyboardOpened])

	useEffect(() => {
		if (initialValue?.latitude && initialValue?.longitude) {
			setMarkerCoordinate({ ...defaultDeltaCoordinates, ...initialValue })
		} else {
			getIpAddressCoodinates()
		}
	}, [])

	const getIpAddressCoodinates = async () => {
		const coordinates = await getCoordinatesByIpAddress()

		console.log(coordinates)
		if (coordinates) {
			return setMarkerCoordinate({ ...initialRegion, ...coordinates })
		}
		return setMarkerCoordinate(initialRegion)
	}

	const requestLocationPermission = async () => {
		const locationPermission = await Location.requestForegroundPermissionsAsync()
		setHasPermission(locationPermission.granted)
		return locationPermission.granted || hasPermission
	}

	const someInvalidFieldSubimitted = () => invalidAddressAfterSubmit

	const getCurrentPositionCoordinated = async () => {
		const permission = await requestLocationPermission()
		if (!permission) return

		try {
			setLoaderIsVisible(true)
			const currentPositionCoordinate: Location.LocationObject = await getCurrentLocation()

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

			convertAndStructureGeocodeAddress(
				geolocationCoordinates.latitude,
				geolocationCoordinates.longitude
			)
			setLoaderIsVisible(false)
		} catch (error) {
			setLoaderIsVisible(false)
			console.log(error)
		}
	}

	const getAddressCoordinates = async () => {
		const permission = await requestLocationPermission()
		if (!permission) return

		const addressGeolocation = await searchAddressByText(address)

		if (!addressGeolocation.length) {
			setInvalidAddressAfterSubmit(true)
			setMarkerCoordinate(null)
			return
		}

		const geolocationCoordinates = {
			latitude: addressGeolocation[0].lat,
			longitude: addressGeolocation[0].lon,
		}

		setMarkerCoordinate({
			...defaultDeltaCoordinates,
			...geolocationCoordinates,
		})

		convertAndStructureGeocodeAddress(
			addressGeolocation[0].lat,
			addressGeolocation[0].lon
		)

		setValidAddress(true)
	}

	const convertAndStructureGeocodeAddress = async (latitude: number, longitude: number) => {
		const geocodeAddress = await convertGeocodeToAddress(latitude, longitude)
		const structuredAddress = structureExpoLocationAddress(geocodeAddress, latitude, longitude)

		setInvalidAddressAfterSubmit(false)
		return structuredAddress
	}

	const updateMarkerPosition = async (coordinates: Coordinates) => {
		setMarkerCoordinate(coordinates)
		markerCoordinate && setInvalidAddressAfterSubmit(false)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={headerDescription ? relativeScreenHeight(25) : relativeScreenHeight(20)}
				relativeHeight={headerDescription ? relativeScreenHeight(25) : relativeScreenHeight(20)}
				centralized
				backgroundColor={someInvalidFieldSubimitted() ? theme.colors.red[2] : backgroundColor}
				borderBottomWidth={0}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={customTitle || 'qual é o endereço?'}
					highlightedWords={customTitleHighligh || ['endereço']}
					fontSize={16}
				>
					{
						headerDescription ? (
							<>
								<VerticalSpacing />
								<HeaderDescription>{showMessageWithHighlight(headerDescription, headerDescriptionHighlightedWords)}</HeaderDescription>
							</>
						) : <></>
					}
				</InstructionCard>
			</DefaultHeaderContainer>
			<MapContainer onLayout={({ nativeEvent }: LayoutChangeEvent) => !mapContainerDimensions.width && setMapContainerDimensions(nativeEvent.layout)}>
				<SearchInputContainer>
					<SearchInput
						value={address}
						validBackgroundColor={validationColor}
						validateText={() => (validAddress && !invalidAddressAfterSubmit && !keyboardOpened)}
						autoCapitalize={'none'}
						placeholder={'rua, bairro, etc'}
						onChangeText={(text: string) => {
							setAddress(text)
							setInvalidAddressAfterSubmit(false)
						}}
						onPressKeyboardSubmit={getAddressCoordinates}
					/>
				</SearchInputContainer>
				<View style={{
					position: 'absolute',
					top: mapContainerDimensions.height / 2 - (relativeScreenWidth(9.72)),
					left: mapContainerDimensions.width / 2 - ((relativeScreenWidth(9.72)) / 2),
					zIndex: 3
				}}
				>
					<MapPointOrangeIcon width={relativeScreenWidth(9.72)} height={relativeScreenWidth(9.72)} />
				</View>
				<MyLocationButtonContainer>
					<PrimaryButton
						relativeHeight={relativeScreenHeight(7)}
						minHeight={50}
						color={theme.colors.white[3]}
						label={'   usar minha localização'}
						highlightedWords={['minha', 'localização']}
						labelColor={theme.colors.black[4]}
						fontSize={16}
						SecondSvgIcon={MapPointWhiteIcon}
						svgIconScale={['50%', '15%']}
						onPress={getCurrentPositionCoordinated}
					/>
				</MyLocationButtonContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate || initialRegion}
					markerCoordinate={null}
					CustomMarker={MapPointWhiteIcon}
					updateMarkerPosition={updateMarkerPosition}
				/>
			</MapContainer>
			{

				markerCoordinate && (
					<ButtonContainerBottom>
						{
							isLoading
								? <Loader />
								: (
									<PrimaryButton
										color={theme.colors.green[3]}
										label={'continuar'}
										labelColor={theme.colors.white[3]}
										SecondSvgIcon={CheckWhiteIcon}
										onPress={() => saveLocation(markerCoordinate)}
									/>
								)
						}
					</ButtonContainerBottom>
				)
			}
		</Container>
	)
}

export { SelectPostLocation }
