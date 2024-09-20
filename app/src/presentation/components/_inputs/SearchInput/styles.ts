import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	textIsValid?: boolean
	validBackgroundColor?: string
	focused: boolean
	relativeWidth?: string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: ${({ relativeWidth }) => relativeWidth || '100%'};
	min-height: ${relativeScreenDensity(45)}px;
	padding: ${relativeScreenDensity(5)}px;
	background-color: ${({ theme, textIsValid, focused, validBackgroundColor }) => (
		textIsValid && validBackgroundColor
			? validBackgroundColor
			: focused ? theme.colors.white[3] : theme.colors.white[2]
	)};
    height: ${relativeScreenDensity(45)}px;
    align-items: center;
    justify-content: center;
	flex-direction: row;
	border-radius: ${relativeScreenWidth(100)}px;
	overflow: hidden;
`

export const SideArea = styled.TouchableOpacity`
	height: 100%;
	width: 15%;
	align-items: center;
    justify-content: center;
`

export const TextInput = styled.TextInput`
	flex: 1;
    font-size: ${({ theme }) => theme.fontSizes[6]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    text-align: center;
	color: ${({ theme }) => theme.colors.black[4]};
`
