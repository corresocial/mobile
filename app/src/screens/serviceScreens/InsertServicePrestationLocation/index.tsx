import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, LayoutRectangle, StatusBar, View } from 'react-native';
import * as Location from 'expo-location'

import { theme } from '../../../common/theme';
import { screenHeight, screenWidth, statusBarHeight } from '../../../common/screenDimensions';
import { ButtonContainer, ButtonContainerBottom, Container, MapContainer } from './styles';
import Check from './../../../assets/icons/check.svg'
import MapPointPurble from './../../../assets/icons/mapPoint-purple.svg'
import MapPointOrange from './../../../assets/icons/mapPoint-orange.svg'

import { InsertServicePrestationLocationScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { CompleteAddress, Coordinates } from '../types';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { BackButton } from '../../../components/_buttons/BackButton';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';
import { CustomMapView } from '../../../components/CustomMapView';
import { ServiceContext } from '../../../contexts/ServiceContext';

const initialRegion = {
    latitude: -14.235004,
    longitude: -51.92528,
    latitudeDelta: 50,
    longitudeDelta: 50,
}

const defaultDeltaCoordinates = {
    latitudeDelta: 0.003,
    longitudeDelta: 0.003
}

function InsertServicePrestationLocation({ navigation }: InsertServicePrestationLocationScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [hasPermission, setHasPermission] = useState(false)
    const [markerCoordinate, setMarkerCoordinate] = useState<Coordinates | null>(null)
    const [address, setAddress] = useState('')
    const [completeAddress, setCompleteAddress] = useState<CompleteAddress>({})

    const [mapContainerDimensions, setMapContainerDimensions] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0 })
    const [validAddress, setValidAddress] = useState(false)
    const [invalidAddressAfterSubmit, setInvalidAddressAfterSubmit] = useState<boolean>(false)

    const requestLocationPermission = async () => {
        const locationPermission = await Location.requestForegroundPermissionsAsync()
        setHasPermission(locationPermission.granted)
        return locationPermission.granted || hasPermission
    }

    const someInvalidFieldSubimitted = () => {
        return invalidAddressAfterSubmit
    }

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
            latitude: latitude,
            longitude: longitude
        })

        const structuredAddress = structureAddress(geocodeAddress)
        // const formatedAddress = formatAddress(geocodeAddress)

        setCompleteAddress(structuredAddress)
        //  setAddress(formatedAddress)

        setInvalidAddressAfterSubmit(false)

        return structuredAddress
    }

    const formatAddress = (geocodeAddress: Location.LocationGeocodedAddress[]) => {
        const {
            street,
            streetNumber,
            name,
            district,
            city,
            subregion,
            region,
            postalCode
        } = geocodeAddress[0]
        return `${street ? street + ',' : ''} ${streetNumber ? streetNumber + ',' : name ? name + ',' : ''} ${district ? district + ' -' : ''} ${city ? city + ' -' : (subregion ? subregion + ' -' : '')} ${region ? region + ',' : ' -'} ${postalCode}`
    }

    const structureAddress = (geocodeAddress: Location.LocationGeocodedAddress[]) => {
        return {
            street: geocodeAddress[0].street,
            streetNumber: geocodeAddress[0].streetNumber || geocodeAddress[0].name,
            district: geocodeAddress[0].district == geocodeAddress[0].subregion ? 'Centro' : geocodeAddress[0].district,
            postalCode: geocodeAddress[0].postalCode,
            city: geocodeAddress[0].city || geocodeAddress[0].subregion,
            subregion: geocodeAddress[0].region,
            country: geocodeAddress[0].country,
            coordinates: {
                latitude: markerCoordinate?.latitude,
                longitude: markerCoordinate?.longitude
            }
        }
    }

    const updateMarkerPosition = async (coordinates: Coordinates) => { // TODO  type
        setMarkerCoordinate(coordinates) // TODO Timeout
        markerCoordinate && setInvalidAddressAfterSubmit(false)
    }

    const saveLocation = async () => {
        if (!markerCoordinateIsAccuracy()) return
        const completeAddress = await convertGeocodeToAddress(markerCoordinate?.latitude as number, markerCoordinate?.longitude as number)
        console.log(completeAddress)
        setServiceDataOnContext({ completeAddress })
        navigation.navigate('SelectLocationView')
    }

    const markerCoordinateIsAccuracy = () => {
        return markerCoordinate?.latitudeDelta as number < 0.0065
    }

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
            outputRange: [theme.purple2, theme.red2],
        })
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={animateDefaultHeaderBackgound()}
                borderBottomWidth={0}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={
                        someInvalidFieldSubimitted()
                            ? 'não foi possível localizar este endereço'
                            : 'onde você oferece seu serviço?'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['não', 'endereço', 'válido']
                            : ['onde', 'seu', 'seu', 'serviço?']
                    }
                >
                    <ProgressBar
                        range={5}
                        value={4}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <LineInput
                value={address}
                relativeWidth={'100%'}
                defaultBackgroundColor={validAddress ? theme.purple1 : theme.white3}
                defaultBorderBottomColor={validAddress ? theme.purple5 : theme.black4}
                validBackgroundColor={theme.purple1}
                validBorderBottomColor={theme.purple5}
                invalidBackgroundColor={theme.red1}
                invalidBorderBottomColor={theme.red5}
                textAlign={'left'}
                invalidTextAfterSubmit={invalidAddressAfterSubmit}
                fontSize={16}
                placeholder={'ex: av. josé de oliveira 5767, londrina'}
                keyboardType={'default'}
                returnKeyType={'search'}
                onPressKeyboardSubmit={getAddressCoordinates}
                validateText={(text: string) => validateAddress(text)}
                onChangeText={(text: string) => {
                    setAddress(text)
                    invalidAddressAfterSubmit && setInvalidAddressAfterSubmit(false)
                }}
            />
            <MapContainer onLayout={(event) => !mapContainerDimensions.width && setMapContainerDimensions(event.nativeEvent.layout)}>
                <View style={{
                    position: 'absolute',
                    top: mapContainerDimensions.height / 2 - (screenWidth * 0.0972),
                    left: mapContainerDimensions.width / 2 - (screenWidth * 0.0972 / 2),
                    zIndex: 3
                }}>
                    <MapPointOrange width={screenWidth * 0.0972} height={screenWidth * 0.0972} />
                </View>
                <ButtonContainer>
                    <PrimaryButton
                        relativeHeight='10%'
                        minHeight={50}
                        flexDirection={'row-reverse'}
                        color={theme.white3}
                        label={'usar minha localização'}
                        highlightedWords={['minha', 'localização']}
                        labelColor={theme.black4}
                        fontSize={16}
                        SvgIcon={MapPointPurble}
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
                markerCoordinate && markerCoordinateIsAccuracy() && //&& validAddress
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
            }
        </Container>
    )
}

export { InsertServicePrestationLocation }