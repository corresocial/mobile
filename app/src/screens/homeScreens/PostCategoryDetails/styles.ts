import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
	flex: 1;
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

export const Body = styled.ScrollView`
	flex: 1;
	padding-bottom: 0px;
`

export const TagsContainer = styled.View`
	padding-bottom: ${RFValue(15)}px;
	align-items: center;
	justify-content: center;
`

export const HorizontalPadding = styled.View`
	width: 100%;
	padding-horizontal: ${RFValue(15)}px;
`

export const HorizontalSigh = styled.View`
	height: 20%;
	width: ${RFValue(10)}px;
`

export const ContainerPadding = styled.ScrollView`
	padding-horizontal: ${RFValue(10)}px;
`
