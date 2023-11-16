import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(12)}px;
	padding-bottom: 0px;
`

export const InputContainer = styled.View`
	margin-vertical: ${relativeScreenWidth(5)}px;
	height: ${RFValue(50)}px;
	padding-horizontal: ${relativeScreenWidth(2)}px;
	padding-vertical: ${relativeScreenWidth(2)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
	padding-bottom: ${relativeScreenHeight(10)}px;
`

interface MacroCategoryContainerProps {
	backgroundColor?: string
}

export const MacroCategoryContainer = styled.View<MacroCategoryContainerProps>`
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.orange2};
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding-vertical: ${relativeScreenHeight(2)}px;
`

export const ContainerPadding = styled.ScrollView<MacroCategoryContainerProps>`
	padding-horizontal: ${RFValue(10)}px;
`
