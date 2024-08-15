import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const MapContainer = styled.View`
    flex: 1;
    position: relative;
`

export const ButtonContainerBottom = styled.View`
    height: ${relativeScreenDensity(150)}px;
    width: 100%;
    justify-content: flex-end;
    padding: 0px ${relativeScreenDensity(20)}px;
    position: absolute;
    bottom: ${relativeScreenHeight(4)}px;
    z-index: 1;
`
