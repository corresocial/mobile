import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	width: number | string
	height: number | string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    height: ${({ height }) => (typeof height === 'string' ? height : `${relativeScreenDensity(height)}px`)};
    width: ${({ width }) => (typeof width === 'string' ? width : `${relativeScreenWidth(width)}px`)};
`

interface ContainerBackgroundProps {
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
    padding: ${(relativeScreenDensity(2))}px ${(relativeScreenDensity(25))}px;
    background-color: ${(props) => (props.selected ? props.selectedColor : props.theme.colors.white[3])};
    border-radius: ${(relativeScreenDensity(100))}px;
    gap: ${(relativeScreenDensity(6))}px;
`

export const ButtonText = styled.Text`
	${({ theme }) => theme.fonts.nunitoSemiBold};
    color: ${({ theme }) => theme.colors.black[4]};
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
`
