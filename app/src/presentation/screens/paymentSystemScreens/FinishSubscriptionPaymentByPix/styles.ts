import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const BodyScrollable = styled.ScrollView`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const Body = styled.View`
	flex: 1;
	padding: ${relativeScreenDensity(17)}px;
	overflow: visible;
`

export const TitleArea = styled.View`
	flex-direction: row;
	margin-bottom: ${relativeScreenDensity(20)}px;
	align-items:center;
`

export const Title = styled.Text`
	margin-left: ${relativeScreenDensity(10)}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[10]}px;
`

export const PaymentStatusArea = styled.View`
	flex-direction: row;
	margin: ${relativeScreenDensity(20)}px 0px;
	align-items:center;
`

export const PaymentStatusText = styled.Text`
	margin-left: ${relativeScreenDensity(20)}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

export const TimerArea = styled.View`
	margin-top: ${relativeScreenDensity(5)}px;
	margin-bottom: ${relativeScreenDensity(30)}px;
`

export const QRCodeArea = styled.View`
	height: ${relativeScreenHeight(41)}px;
`
