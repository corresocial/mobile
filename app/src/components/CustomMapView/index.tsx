import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { SvgProps } from 'react-native-svg'
import { Coordinates } from '../../screens/serviceScreens/types'

interface CustomMapViewProops {
    regionCoordinate: Coordinates
    markerCoordinate: Coordinates | null
    CustomMarker: React.FC<SvgProps>
    onLongPressMap: (event : any) => void
}

function CustomMapView({
    regionCoordinate,
    markerCoordinate,
    CustomMarker,
    onLongPressMap

}: CustomMapViewProops) {


    return (
        <MapView
            style={{ flex: 1, position: 'relative' }}
            cacheEnabled={false}
            region={regionCoordinate}
            mapType='standard'
            initialRegion={regionCoordinate}
            // loadingEnabled={false}
            // onRegionChange={(newRegion) => updateDeltaCoordinates(newRegion)}
            onLongPress={(event) => onLongPressMap(event)}
        >
            {
                markerCoordinate &&
                <Marker
                    coordinate={{ latitude: markerCoordinate.latitude, longitude: markerCoordinate.longitude }}
                    title={'seu local'}
                    draggable={true}
                >

                    <CustomMarker width={40} height={40} />
                </Marker>
            }
        </MapView>
    )
}

export { CustomMapView }