import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface CardHighlighProps {
	highlight: boolean
}

export const Container = styled.View<CardHighlighProps>`
	background-color: ${({ theme, highlight }) => (highlight ? theme.green1 : theme.white3)};
	border-left-width: ${({ highlight }) => (highlight ? RFValue(4) : RFValue(2))}px;
	border-left-color: ${({ theme }) => theme.black4};
	padding-vertical: ${RFValue(4)}px;
	padding-left: ${RFValue(10)}px;
`

export const CustomText = styled.Text<CardHighlighProps>`
	font-family: ${({ highlight }) => (highlight ? 'Arvo_700Bold' : 'Arvo_400Regular')};
	font-size: ${RFValue(14)}px;
`
