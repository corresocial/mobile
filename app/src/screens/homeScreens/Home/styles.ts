import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	background-color: ${({ theme }) => theme.orange2};
`

export const DropdownContainer = styled.View`
	margin-top: ${RFValue(5)}px;
	padding-horizontal: ${RFValue(10)}px;
`

export const HorizontalPostTypes = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	margin-vertical: ${RFValue(15)}px;
`

export const RecentPostsContainer = styled.View`

`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(10)}px;
`

export const FooterSigh = styled.View`
	width: 100%;
	height: ${RFValue(280)}px;
`
