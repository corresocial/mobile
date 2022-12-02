import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const SaleValueArea = styled.View`
	padding-vertical: ${RFValue(10)}px;
	flex-direction: row;
	align-items: flex-end;
`

export const ExchangeArea = styled.View`
	flex-direction: row;
	align-items: flex-end;
	padding-vertical: ${RFValue(10)}px;
`

export const SmallFont = styled.Text`
	font-size: ${RFValue(16)}px;
	font-family: Arvo_400Regular;
	padding-bottom: 1%;
`

export const LargeFont = styled.Text`
	font-size: ${RFValue(24)}px;
	font-family: Arvo_700Bold;
	margin-left: 1px;
`

export const ExchangeText = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_400Regular;
`

export const Decimals = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	margin-right: 1%;
	padding-bottom: 1%;
`
