import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
	padding-bottom: ${relativeScreenHeight(10)}px;
	`

export const DropdownContainer = styled.View`
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	margin-top: ${RFValue(5)}px;
	padding-horizontal: ${RFValue(10)}px;
`

export const RecentPostsContainer = styled.ScrollView`
	flex: 1;
`

export const ContainerPadding = styled.ScrollView`
	padding-horizontal: ${RFValue(10)}px;
`
