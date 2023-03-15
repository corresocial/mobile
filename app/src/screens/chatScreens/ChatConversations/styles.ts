import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
	padding-bottom: ${relativeScreenHeight(10)}px;
`

export const Header = styled.View`
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
	width: 100%;
	padding: ${RFValue(12)}px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.white3};
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(25)}px;
`

export const OptionsArea = styled.View`
	flex-direction: row;
`

export const OptionSigh = styled.View`
	height: 100%;
	width: ${relativeScreenWidth(2)}px;
`

export const SearchInputContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding: ${RFValue(5)}px;
	border-bottom-width: ${RFValue(3)}px;
	border-bottom-color: ${({ theme }) => theme.black4}
`

export const SearchInput = styled.TextInput`
	width: 85%;
	height: 100%;
	font-size: ${RFValue(15)}px;
	font-family: Arvo_400Regular;
	text-align: left;
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

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(10)}px;
`

export const FooterSigh = styled.View`
	width: 100%;
	height: ${RFValue(280)}px;
`
