import React from 'react'
import MapView, { Circle, Marker } from 'react-native-maps'
import { SvgProps } from 'react-native-svg'

import { Coordinates, LocationViewType } from '../../screens/serviceScreens/types'

interface CustomMapViewProops {
    regionCoordinate: Coordinates
    markerCoordinate: Coordinates | null
    CustomMarker: React.FC<SvgProps>
    locationView?: LocationViewType
    onLongPressMap: (event: any) => void
}

function CustomMapView({
    regionCoordinate,
    markerCoordinate,
    CustomMarker,
    locationView,
    onLongPressMap,

}: CustomMapViewProops) {

    const approximateRadius = 125

    const generateRandomCoordinateOnRadius = () => {
        if (!locationView) return null

        const realCoordinates = { ...markerCoordinate } as Coordinates

        const newCoordinates = {
            ...realCoordinates,
            latitude: realCoordinates.latitude + getRandomDetachment(),
            longitude: realCoordinates.longitude + getRandomDetachment()
        }

        return newCoordinates as Coordinates
    }

    const getRandomDetachment = () => {
        const binaryRandom = Math.round(Math.random())
        const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000

        console.log('binaryRandom: ' + binaryRandom)
        console.log('detachmentRandom: ' + detachmentRandom)

        if (binaryRandom) {
            return (approximateRadius * detachmentRandom)
        } else {
            return -(approximateRadius * detachmentRandom)
        }
    }

    let randomCoordinate = generateRandomCoordinateOnRadius()

    return (
        <MapView
            style={{ flex: 1, position: 'relative' }}
            cacheEnabled={false}
            region={locationView == 'approximate' ? randomCoordinate as Coordinates : regionCoordinate }
            mapType='standard'
            initialRegion={randomCoordinate ? randomCoordinate : regionCoordinate}
            // loadingEnabled={false}
            // onRegionChange={(newRegion) => updateDeltaCoordinates(newRegion)}
            onLongPress={(event) => onLongPressMap(event)}
        >
            {
                markerCoordinate &&
                <>
                    {
                        locationView == 'approximate' &&
                        <Circle
                            center={randomCoordinate as Coordinates}
                            radius={approximateRadius}
                            strokeWidth={4}

                        >
                        </Circle>
                    }
                    <Marker
                        coordinate={locationView == 'approximate' ? randomCoordinate as Coordinates : markerCoordinate}
                        title={'seu local'}
                        draggable={true}
                    >
                        <CustomMarker width={40} height={40} />
                    </Marker>
                </>


            }
        </MapView>
    )
}

export { CustomMapView }