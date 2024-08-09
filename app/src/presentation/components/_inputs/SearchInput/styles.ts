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
	min-height: ${relativeScreenDensity(40)}px;
	padding: ${relativeScreenDensity(5)}px;
	background-color: ${({ theme, textIsValid, focused, validBackgroundColor }) => (
		textIsValid && validBackgroundColor
			? validBackgroundColor
			: focused ? theme.white3 : theme.white2
	)};
    height: ${relativeScreenDensity(40)}px;
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
    font-family: Arvo_400Regular;
    text-align: center;
	color: ${({ theme }) => theme.black4};
`
