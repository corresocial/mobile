import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Container = styled.View`
    flex: 1;
`

export const MapContainer = styled.View`
    flex: 1;
    position: relative;
`

export const ButtonContainerBottom = styled.View`
    height: 18%;
    width: 100%;
    justify-content: space-around;
    padding-horizontal: 30px;
    position: absolute;
    bottom: 20px;
    z-index: 1;
`