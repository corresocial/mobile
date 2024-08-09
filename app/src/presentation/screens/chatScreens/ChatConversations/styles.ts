import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
	padding-bottom: ${relativeScreenHeight(10)}px;
`

export const Header = styled.View`
	width: 100%;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[15]}px;
`

export const OptionsArea = styled.View`
	flex-direction: row;
`

export const SearchInputContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const IconArea = styled.View`
	align-items: center;
	justify-content: center;
	width: 10%;
`

export const ConversationArea = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
`

export const ConversationCardContainer = styled.View`
	padding: 0px ${RFValue(10)}px;
`

export const ConversationList = styled.FlatList``

// Horizontal slider

export const HorizontalHeaderScroll = styled.ScrollView`
	width: 100%;
	padding-bottom: ${RFValue(10)}px;
`

export const SelectPeriodButtonContainer = styled.View`
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	width: ${relativeScreenWidth(100)}px;
	padding: ${RFValue(5)}px ${RFValue(15)}px;
`
