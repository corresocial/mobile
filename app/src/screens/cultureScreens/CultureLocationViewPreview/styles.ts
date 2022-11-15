import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
`

export const MapContainer = styled.View`
    flex: 1;
    position: relative;
`

export const ButtonContainerBottom = styled.View`
    height: ${RFValue(150)}px; 
    width: 100%;
    justify-content: space-around;
    padding-horizontal: ${RFValue(20)}px;
    position: absolute;
    bottom: 20px;
    z-index: 1;
`