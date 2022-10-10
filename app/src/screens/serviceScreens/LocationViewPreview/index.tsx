import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { ButtonContainerBottom, Container, MapContainer } from './styles';
import Uncheck from './../../../assets/icons/uncheck.svg'
import Check from './../../../assets/icons/check.svg'
import MapPointOrange from './../../../assets/icons/mapPoint-orange.svg'
import Eye from './../../../assets/icons/eye.svg'
import EyeHalfTraced from './../../../assets/icons/eyeHalfTraced.svg'
import EyeTraced from './../../../assets/icons/eyeTraced.svg'

import { LocationViewPreviewScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { Coordinates, LocationViewType } from '../types';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { CustomMapView } from '../../../components/CustomMapView';
import { InfoCard } from '../../../components/_cards/InfoCard';

const initialRegion = {
    latitude: -11.70721,
    longitude: -61.99830300000001,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001
}

function LocationViewPreview({ navigation, route }: LocationViewPreviewScreenProps) {

    const {setServiceDataOnContext} = useContext(ServiceContext)

    const [locationViewSelected, setLocationViewSelected] = useState<LocationViewType>()
    const [regionCoordinate, setRegionCoordinate] = useState<Coordinates>(initialRegion)
    const [markerCoordinate, setMarkerCoordinate] = useState<Coordinates | null>(initialRegion)

    useEffect(() => {
        if (!locationViewSelected) {
            const locationView = getLocationViewFromRouteParams()
            setLocationViewSelected(locationView)
        }
    })

    const getLocationViewFromRouteParams = () => {
        return route.params.locationView
    }

    const getLocationViewTitle = () => {
        switch (locationViewSelected as LocationViewType) {
            case 'private': return ' localização \nprivada'
            case 'approximate': return 'localização \naproximada'
            case 'public': return 'localização \npública'
            default: return 'switch option unfount'
        }
    }

    const getLocationViewDescription = () => {
        switch (locationViewSelected as LocationViewType) {
            case 'private': return 'os clientes veem seu perfil, mas não sabem sua localização.'
            case 'approximate': return 'os clientes podem ver apenas a região onde você está.'
            case 'public': return 'os usuários podem ver exatamente onde você está.'
            default: return 'switch option unfount'
        }
    }

    const getLocationViewHighlightedWords = () => {
        switch (locationViewSelected as LocationViewType) {
            case 'private': return ['\nprivada', 'não', 'sabem', 'sua', 'localização.']
            case 'approximate': return ['\naproximada', 'a', 'região', 'onde', 'você', 'está.']
            case 'public': return ['\npública', 'exatamente', 'onde', 'você', 'está.']
            default: return []
        }
    }

    const getLocationViewIcon = () => {
        switch (locationViewSelected as LocationViewType) {
            case 'private': return EyeTraced
            case 'approximate': return EyeHalfTraced
            case 'public': return Eye
            default: return MapPointOrange
        }
    }

    const saveLocation = () => {
        setServiceDataOnContext({

        })
        navigation.navigate('SelectDeliveryMethod')
    }

    return (
        <Container >
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.purple2}
                borderBottomWidth={0}
            >
                <InfoCard
                    height={'95%'}
                    color={theme.white3}
                    title={getLocationViewTitle()}
                    description={getLocationViewDescription()}
                    highlightedWords={getLocationViewHighlightedWords()}
                />
            </DefaultHeaderContainer>
            <MapContainer>
                <CustomMapView
                    regionCoordinate={regionCoordinate}
                    markerCoordinate={markerCoordinate}
                    CustomMarker={getLocationViewIcon()}
                    onLongPressMap={() => { }}
                    locationView={locationViewSelected}
                />
            </MapContainer>
            <ButtonContainerBottom>
                <PrimaryButton
                    flexDirection={'row-reverse'}
                    color={theme.red3}
                    label={'voltar, escolher outra'}
                    highlightedWords={['voltar,']}
                    labelColor={theme.white3}
                    fontSize={16}
                    SvgIcon={Uncheck}
                    svgIconScale={['30%', '20%']}
                    onPress={() => navigation.goBack()}
                />
                <PrimaryButton
                    flexDirection={'row-reverse'}
                    color={theme.green3}
                    label={'isso mesmo, continuar'}
                    highlightedWords={['isso', 'mesmo,']}
                    fontSize={16}
                    labelColor={theme.white3}
                    SvgIcon={Check}
                    svgIconScale={['30%', '20%']}
                    onPress={saveLocation}

                />
            </ButtonContainerBottom>
        </Container>
    )
}

export { LocationViewPreview }