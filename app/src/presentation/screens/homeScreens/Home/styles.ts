import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
`

export const DropdownContainer = styled.View`
	padding: 0px ${RFValue(10)}px;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	margin-top: ${RFValue(5)}px;
`

export const RecentPostsContainer = styled.ScrollView`
	flex: 1;
`

export const ContainerPadding = styled.View`
	padding: 0px ${RFValue(10)}px;
	align-items: flex-end;
`
