import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const ContainerButtons = styled.View`
    flex: 1;
    justify-content: space-around;
    padding: ${relativeScreenDensity(40)}px 0px;
`
