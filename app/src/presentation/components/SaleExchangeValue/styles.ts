import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
`

export const ValueArea = styled.View`
	flex-direction: row;
`

export const ExchangeArea = styled.View`
	flex-direction: row;
`

export const SmallFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_400Regular';
	padding-bottom: 1%;
`

export const LargeFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
	font-family: 'Arvo_700Bold';
	margin-left: 1px;
	align-self: flex-start;
`

export const ExchangeWord = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
	font-family: 'Arvo_700Bold';
`

export const Decimals = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: 'Arvo_700Bold';
	margin-right: 1%;
	padding-bottom: 1%;
`
