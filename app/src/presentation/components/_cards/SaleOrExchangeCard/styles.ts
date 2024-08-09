import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const SaleValueArea = styled.View`
	padding: ${RFValue(10)}px 0px;
	flex-direction: row;
	align-items: flex-end;
`

export const ExchangeArea = styled.View`
	flex-direction: row;
	align-items: flex-end;
	padding: ${RFValue(10)}px 0px;
`

export const SmallFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	font-family: Arvo_400Regular;
	padding-bottom: 1%;

`
export const SmallFontBold = styled(SmallFont)`
	font-family: Arvo_700Bold;
`

export const LargeFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[14]}px;
	font-family: Arvo_700Bold;
	margin-left: 1px;
`

export const ExchangeText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
	font-family: Arvo_400Regular;
`

export const Decimals = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
	margin-right: 1%;
	padding-bottom: 1%;
`
