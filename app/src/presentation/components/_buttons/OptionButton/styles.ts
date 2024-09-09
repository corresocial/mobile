import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white[2]};
`

export const ContainerBottom = styled(Animatable.View as any)`
    width: 98%;
	align-self: flex-end;
    flex-direction: row;
    border-radius: ${relativeScreenDensity(20)}px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.black[4]};
`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const ContainerSurface = styled.View<ContainerSurfaceProps>`
	width: 100%;
	height: 100%;
	flex-direction: row;
    background-color: ${({ theme }) => theme.colors.white[3]};
    border: ${relativeScreenDensity(2.2)}px solid black;
    border-radius:${relativeScreenDensity(20)}px;
    position: absolute;
    overflow: hidden;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

export const LeftArea = styled.View`
    background-color: ${({ theme }) => theme.colors.orange[3]};
    height: 101%;
    align-items: center;
    justify-content: center;
	border-right-width: ${relativeScreenDensity(3.5)}px;
	border-color: ${({ theme }) => theme.colors.black[4]};
`

interface LeftSideTextProps {
	leftSideTextColor?: string
}

export const LeftSideText = styled.Text<LeftSideTextProps>`
	text-align: center;
	color: ${({ theme, leftSideTextColor }) => leftSideTextColor || theme.colors.white[3]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	${({ theme }) => theme.fonts.arvoRegular};
`

export const LabelDescriptionArea = styled.View`
    flex: 1;
    padding: ${relativeScreenDensity(10)}px;
    height: 100%;
    justify-content: space-around;
`

export const ButtonLabel = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
    font-size: ${({ theme }) => theme.fontSizes[10]}px;
	${({ theme }) => theme.fonts.arvoRegular};
`

export const Description = styled.Text`
    color: ${({ theme }) => theme.colors.black[4]};
	${({ theme }) => theme.fonts.arvoRegular};
`

interface ShortDescriptionProps {
	fontSize?: number
}

export const ShortDescription = styled.Text<ShortDescriptionProps>`
	width: 100%;
	align-self: center;
	text-align: center;
	font-size: ${({ fontSize }) => (fontSize || relativeScreenDensity(11))}px;
	margin-top: 3%;
    color: ${({ theme }) => theme.colors.black[4]};
	${({ theme }) => theme.fonts.arvoRegular};
`
