import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
`

export const DropdownContainer = styled.View`
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	margin-top: ${RFValue(5)}px;
	padding-horizontal: ${RFValue(10)}px;
`

export const RecentPostsContainer = styled.View`

`
