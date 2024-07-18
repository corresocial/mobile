import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerBackgroundProps {
	relativeWidth: string | number
	relativeHeight: string | number
	isIconButton: boolean
}

export const ContainerBackground = styled.View<ContainerBackgroundProps>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: ${relativeScreenDensity(6)}px;
	position: relative;
	background-color: ${({ theme }) => theme.black4};
	height: ${({ relativeHeight }) => (typeof relativeHeight === 'string' ? relativeHeight : `${relativeScreenDensity(relativeHeight)}px`)};
	width: ${(props) => (
		props.isIconButton && typeof props.relativeHeight === 'number'
			? `${relativeScreenDensity(props.relativeHeight)}px` : typeof props.relativeWidth === 'string'
				? props.relativeWidth : `${relativeScreenDensity(props.relativeWidth)}px`
	)};
	border-radius: ${relativeScreenDensity(17)}px;
`

interface ContainerSurfaceProps {
	backgroundColor: string
	flexDirection: ViewStyle['flexDirection']
	buttonPressed: boolean
}

export const ContainerSurface = styled.TouchableOpacity<ContainerSurfaceProps>`
	height: 100%;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: ${relativeScreenDensity(2)}px solid black;
    position: absolute;
	right: ${relativeScreenDensity(5)}px;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
	transform: ${({ buttonPressed }) => (buttonPressed ? 'translateX(5px)' : 'translateX(0px)')};
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.white3};
	border-radius: ${relativeScreenDensity(17)}px;
	gap: ${relativeScreenDensity(5)}px;
`

interface ButtonTextProps {
	textTheme: 'light' | 'dark'
}

export const ButtonText = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.arvoBold};
    font-size: ${({ theme }) => theme.fontSizes.arvo[2]}px;
    color: ${({ textTheme, theme }) => (textTheme === 'light' ? theme.colors.white[3] : theme.colors.black[4])};
`
