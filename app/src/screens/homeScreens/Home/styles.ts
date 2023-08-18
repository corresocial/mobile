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

export const RecentPostsContainer = styled.ScrollView`
	flex: 1;
`

export const ContainerPadding = styled.View`
	padding-horizontal: ${RFValue(10)}px;
	align-items: flex-end;
`

export const AdSubscriptionContainer = styled.View`
	padding-horizontal: ${RFValue(15)}px;
`
