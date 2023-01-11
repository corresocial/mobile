import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(12)}px;
`

export const InputContainer = styled.View`
	margin-vertical: ${RFValue(12)}px;
	height: ${RFValue(50)}px;
	padding-horizontal: ${RFValue(22)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-width-color: ${({ theme }) => theme.black4};
	border-bottom-width: ${RFValue(3)}px;
`

export const SearchInput = styled.TextInput`
	width: 85%;
	height: 100%;
	font-size: ${RFValue(16)}px;
	font-family: Arvo_400Regular;
	text-align: center;
`

export const Body = styled.View`
	flex: 1;
	padding: ${RFValue(15)}px;
	padding-bottom: 0px;
`

export const LastSigh = styled.View`
	width: 100%;
	height: ${RFValue(60)}px;
`
