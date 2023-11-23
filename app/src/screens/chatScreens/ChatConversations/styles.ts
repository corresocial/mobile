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

export const Header = styled.View`
	width: 100%;
	padding: ${RFValue(12)}px;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(25)}px;
`

export const OptionsArea = styled.View`
	flex-direction: row;
`

export const SearchInputContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${RFValue(5)}px;
	padding-bottom: 0px;
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

export const ConversationList = styled.FlatList`
	padding: ${RFValue(10)}px;
`
