import { Platform } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(10)}px;
	position: ${Platform.OS === 'ios' ? 'relative' : 'absolute'};
	bottom: 0;
`

interface SideButtonAreaProps {
	hasInputMessage: string
}

export const SideButtonArea = styled.TouchableOpacity<SideButtonAreaProps>`
	background-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.colors.black[4] : theme.colors.white[3])};
	border-radius: ${relativeScreenDensity(15)}px;
	border-color: ${({ theme }) => theme.colors.black[2]};
	height: ${relativeScreenDensity(40)}px;
	width: ${relativeScreenDensity(40)}px;
	justify-content: center;
	align-items: center;
	margin-left: ${relativeScreenWidth(3)}px;
`

interface InputButtonProps {
	hasInputMessage: boolean
	buttonPressed: boolean
}

export const SendButtonAreaInner = styled.View<InputButtonProps>`
	border-radius: ${relativeScreenDensity(15)}px;
	border-width: ${relativeScreenDensity(2.5)}px;
	border-color: ${({ theme }) => theme.colors.black[2]};
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	position: absolute;
	background-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.colors.green[3] : theme.colors.white[3])};
	border-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.colors.black[4] : theme.colors.white[3])};
	left: ${({ theme, buttonPressed, hasInputMessage }) => (!hasInputMessage || buttonPressed ? -1 : -theme.shadowSize.small)}px;
`

interface InputMessageProps {
	inputFocused: boolean
}

export const InputMessage = styled.TextInput<InputMessageProps>`
	flex: 1;
	height: 100%;
	max-height: ${relativeScreenHeight(15)}px;
	text-align-vertical: center;
	text-align: center;
	margin: 0px ${relativeScreenDensity(10)}px;
	padding: 0px ${relativeScreenDensity(10)}px;
	padding-top: ${relativeScreenDensity(12)}px;
	padding-bottom: ${relativeScreenDensity(12)}px;
	font-family: Arvo_400Regular;
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
	border-radius: ${relativeScreenDensity(50)}px;
	background-color: ${({ theme, inputFocused }) => (inputFocused ? theme.colors.white[3] : theme.colors.white[2])};
`
