import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const SaleValueArea = styled.View`
	padding: ${relativeScreenDensity(10)}px 0px;
	flex-direction: row;
	align-items: flex-end;
`

export const ExchangeArea = styled.View`
	flex-direction: row;
	align-items: flex-end;
	padding: ${relativeScreenDensity(10)}px 0px;
`

export const SmallFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[6]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	padding-bottom: 1%;

`
export const SmallFontBold = styled(SmallFont)`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`

export const LargeFont = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[14]}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	margin-left: 1px;
`

export const ExchangeText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
`

export const Decimals = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	margin-right: 1%;
	padding-bottom: 1%;
`
