import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.TouchableWithoutFeedback`
   width: 100%;
`
export const TouchableContainer = styled.TouchableWithoutFeedback`
    width: 100%;
`

interface ConainerBottomProps {
	relativeWidth: string | number
	height: number
	rounded: boolean
	halfRounded: boolean
}

export const ContainerBottom = styled.View<ConainerBottomProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: ${relativeScreenDensity(6)}px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.black[4]};
	height: ${({ height }) => height}px;
	width: ${({ relativeWidth }) => (typeof (relativeWidth) === 'string' ? relativeWidth : `${relativeWidth}px`)};
	border-radius: ${({ halfRounded, rounded, height }) => (rounded ? height / 2 : halfRounded ? relativeScreenDensity(25) : relativeScreenDensity(15))}px;
`

interface ConainerSurfaceProps {
	backgroundColor: string
	flexDirection: ViewStyle['flexDirection']
	buttonPressed: boolean
	rounded: boolean
	halfRounded: boolean
}

export const ContainerSurface = styled.View<ConainerSurfaceProps>`
	height: 100%;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: ${relativeScreenDensity(2)}px solid black;
    position: absolute;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.small}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.small}px;
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.white[3]};
	border-radius: ${({ halfRounded, rounded }) => (rounded ? 800 : halfRounded ? relativeScreenDensity(25) : relativeScreenDensity(15))}px;
`

export const ButtonLabel = styled.Text`
    margin-left: ${relativeScreenDensity(8)}px;
    color: ${({ theme }) => theme.colors.white[3]};
    font-family: Arvo_700Bold;
`
