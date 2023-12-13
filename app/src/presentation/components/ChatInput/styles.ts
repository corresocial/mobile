import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-horizontal: ${RFValue(10)}px;
	padding-vertical: ${RFValue(10)}px;
	position: ${Platform.OS === 'ios' ? 'relative' : 'absolute'};
	bottom: 0;
`

interface SideButtonAreaProps {
	hasInputMessage: string
}

export const SideButtonArea = styled.TouchableOpacity<SideButtonAreaProps>`
	background-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.black4 : theme.white3)};
	border-radius: ${RFValue(15)}px;
	border-color: ${({ theme }) => theme.black2};
	height: ${RFValue(40)}px;
	width: ${RFValue(40)}px;
	justify-content: center;
	align-items: center;
	margin-left: ${relativeScreenWidth(3)}px;
`

interface InputButtonProps {
	hasInputMessage: boolean
	buttonPressed: boolean
}

export const SendButtonAreaInner = styled.View<InputButtonProps>`
	border-radius: ${RFValue(15)}px;
	border-width: ${RFValue(2.5)}px;
	border-color: ${({ theme }) => theme.black2};
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	position: absolute;
	background-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.green3 : theme.white3)}
	border-color: ${({ theme, hasInputMessage }) => (hasInputMessage ? theme.black4 : theme.white3)}
	left: ${({ buttonPressed, hasInputMessage }) => (!hasInputMessage || buttonPressed ? -1 : -relativeScreenWidth(2))}px
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
	margin-horizontal: ${RFValue(10)}px;
	padding-horizontal: ${RFValue(10)}px;
	padding-top: ${RFValue(12)}px;
	padding-bottom: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(13)}px;
	border-radius: ${RFValue(50)}px;
	background-color: ${({ theme, inputFocused }) => (inputFocused ? theme.white3 : theme.white2)};
`
