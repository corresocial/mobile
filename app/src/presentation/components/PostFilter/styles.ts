import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
    height: ${relativeScreenDensity(40)}px;
    flex-direction: row;
    align-items: center;
`
