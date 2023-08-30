import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
	width: 40%;
`

export const ValueArea = styled.View`
	flex-direction: row;
	align-self: flex-end;
	align-items: flex-end;
`

export const ExchangeArea = styled.View`
	flex-direction: row;
	align-self: flex-end;
	align-items: flex-end;
`

export const SmallFont = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	padding-bottom: 1%;
`

export const LargeFont = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
	margin-left: 1px;
	align-self: flex-start;
`

export const ExchangeWord = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
`

export const Decimals = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_700Bold;
	margin-right: 1%;
	padding-bottom: 1%;
`
