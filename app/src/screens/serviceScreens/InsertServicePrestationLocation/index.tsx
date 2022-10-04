import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native';
import MapView, { MapEvent, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { theme } from '../../../common/theme';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { ButtonContainer, ButtonContainerBottom, Container, MapContainer } from './styles';
import Check from './../../../assets/icons/check.svg'
import MapPointPurble from './../../../assets/icons/mapPoint-purple.svg'
import MapPointOrange from './../../../assets/icons/mapPoint-orange.svg'

import { InsertServicePrestationLocationScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { Coordinates } from '../types';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { BackButton } from '../../../components/_buttons/BackButton';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

const initialRegion = {
    latitude: -11.70721,
    longitude: -61.99830300000001,
    latitudeDelta: 0.00222,
    longitudeDelta: 0.00221,
}

function InsertServicePrestationLocation({ navigation, route }: InsertServicePrestationLocationScreenProps) {

    const [status, requestPermission] = Location.useForegroundPermissions()
    const [region, setRegion] = useState<Coordinates>(initialRegion)
    const [geolocation, setGeolocation] = useState<Coordinates | null>(null)
    const [address, setAddress] = useState('')
    const [validAddress, setValidAddress] = useState(false)
    const [invalidAddressAfterSubmit, setInvalidAddressAfterSubmit] = useState<boolean>(false)

    useEffect(() => {
        if (geolocation) {
            setRegion(geolocation)
        }
    }, [geolocation])

    const someInvalidFieldSubimitted = () => {
        return invalidAddressAfterSubmit
    }

    const validateAddress = (text: string) => {
        setInvalidAddressAfterSubmit(false)
        setValidAddress(false)
        return validAddress
    }

    const getCurrentPositionCoordinated = async () => {
        const geoLocation = await Location.getCurrentPositionAsync()
        const geolocationCoordinates = {
            latitude: geoLocation.coords.latitude,
            longitude: geoLocation.coords.longitude
        }

        setGeolocation({
            ...region,
            ...geolocationCoordinates,
        })
        setValidAddress(true)

        convertGeocodeToAddress({
            ...region,
            latitude: geolocationCoordinates.latitude,
            longitude: geolocationCoordinates.longitude
        })
    }

    const getAddressCoordinates = async () => {
        const locationPermission = await requestPermission()
        if (!locationPermission?.granted || address.length < 1) return

        const geoLocation = await Location.geocodeAsync(address)

        if (!geoLocation.length) {
            setInvalidAddressAfterSubmit(true)
            setGeolocation(null)
            return
        }

        const geolocationCoordinates = {
            latitude: geoLocation[0].latitude,
            longitude: geoLocation[0].longitude,
        }

        setGeolocation({
            ...region,
            ...geolocationCoordinates,
        })

        convertGeocodeToAddress({
            ...region,
            latitude: geoLocation[0].latitude,
            longitude: geoLocation[0].longitude
        })
    }

    const setRegionOnTouchMap = ({ nativeEvent }: MapEvent<{}>) => {
        setGeolocation({
            ...region,
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude
        })

        convertGeocodeToAddress({
            ...region,
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude
        })
    }

    const convertGeocodeToAddress = async (coordinates: Coordinates) => {
        const geocodeAddress = await Location.reverseGeocodeAsync({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        })

        const formatedAddress = formatAddress(geocodeAddress)
        setValidAddress(true)
        setInvalidAddressAfterSubmit(false)
        setAddress(formatedAddress)
    }

    const formatAddress = (geocodeAddress: Location.LocationGeocodedAddress[]) => {
        // console.log(geocodeAddress)
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

    const saveLocation = () => {
        //save
        navigation.navigate('SelectLocationView')
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
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
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
                        range={4}
                        value={3}
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
            {/* <SearchAddressInput /> */}
            <MapContainer>
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
                <MapView
                    style={{ flex: 1, position: 'relative' }}
                    cacheEnabled={false}
                    region={region}
                    mapType='standard'
                    initialRegion={region}
                    // loadingEnabled={false}
                    // onRegionChange={(newRegion) => updateDeltaCoordinates(newRegion)}
                    onLongPress={(event) => setRegionOnTouchMap(event)}
                >
                    {
                        geolocation &&
                        <Marker
                            coordinate={{ latitude: geolocation.latitude, longitude: geolocation.longitude }}
                            title={'seu local'}
                            draggable={true}
                        >

                            <MapPointOrange width={40} height={40} />
                        </Marker>
                    }
                </MapView>
            </MapContainer>
            {
                geolocation && validAddress &&
                <ButtonContainerBottom>
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={theme.green3}
                        label={'continuar'}
                        labelColor={theme.white3}
                        SvgIcon={Check}
                        svgIconScale={['30%', '15%']}
                        startsHidden={false}
                        onPress={saveLocation}
                    />
                </ButtonContainerBottom>
            }
        </Container>
    )
}

export { InsertServicePrestationLocation }