import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps{
    width: number | null
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    height: ${(relativeScreenHeight(6))}px;
    width: ${({ width }) => (width ? `${width}px` : 'auto')};
`

interface ContainerBackgroundProps{
    reversed?: boolean
    selected?: boolean
    selectedColor?: string
}

export const ContainerBackground = styled.View<ContainerBackgroundProps>`
    height: 100%;
    flex-direction: ${({ reversed }) => (reversed ? 'row-reverse' : 'row')};
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: ${(relativeScreenDensity(2))}px ${(relativeScreenDensity(40))}px;
    background-color: ${(props) => (props.selected ? props.selectedColor : props.theme.white3)};
    border-radius: ${(relativeScreenDensity(100))}px;
    gap: ${(relativeScreenDensity(10))}px;
`

export const ButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
    font-family: ${({ theme }) => theme.fonts.nunitoSemiBold}; 
    font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px; 
`