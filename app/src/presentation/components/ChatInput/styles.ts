import { RFValue } from 'react-native-responsive-fontsize'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-top-width: ${RFValue(5)}px;
	border-top-color: ${({ theme }) => theme.black4};
	padding: ${RFValue(5)}px;
	padding-bottom:${Platform.OS === 'ios' ? 10 : RFValue(5)}px;
	position: ${Platform.OS === 'ios' ? 'relative' : 'absolute'};
	bottom: 0;
`

export const SendButtonArea = styled.TouchableOpacity`
	border-radius: ${RFValue(15)}px;
	border-color: ${({ theme }) => theme.black2};
	background-color: ${({ theme }) => theme.black4};
	height: ${relativeScreenHeight(6)}px;
	width: ${relativeScreenHeight(6)}px;
	margin-right: ${relativeScreenWidth(3)}px;
	justify-content: center;
	align-items: center;
`

export const SendButtonAreaInner = styled.View`
	border-radius: ${RFValue(15)}px;
	border-width: ${RFValue(2.5)}px;
	border-color: ${({ theme }) => theme.black2};
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: ${relativeScreenWidth(2)}px;
`

export const InputMessage = styled.TextInput`
	flex: 1;
	height: 100%;
	background-color: ${({ theme }) => theme.white3};
	margin: ${RFValue(10)}px;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(13)}px;
`
