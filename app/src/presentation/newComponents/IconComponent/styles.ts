import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps{
    width: number | string
    height: number | string
}

export const Container = styled.View<ContainerProps>`
    align-items: center;
    justify-content: center;
    width: ${({ width }) => (typeof width === 'string' ? width : `${relativeScreenDensity(width)}px`)};
    height:  ${({ height }) => (typeof height === 'string' ? height : `${relativeScreenDensity(height)}px`)};
`

export const TouchableContainer = styled.TouchableOpacity<ContainerProps>`
    align-items: center;
    justify-content: center;
    width: ${({ width }) => width}px;
    height:  ${({ height }) => height}px;
`
