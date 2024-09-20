import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const BodyScrollable = styled.ScrollView`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const Body = styled.KeyboardAvoidingView`
	flex: 1;
	overflow: visible;
`

export const TitleArea = styled.View`
	flex-direction: row;
	margin-bottom: ${relativeScreenDensity(20)}px;
	align-items:center;
`

export const Title = styled.Text`
	margin-left: ${relativeScreenDensity(10)}px;
	font-family: 'Arvo_400Regular';
	font-size: ${({ theme }) => theme.fontSizes[10]}px;

`

export const PaymentStatusArea = styled.View`
	flex-direction: row;
	margin: ${relativeScreenDensity(20)}px 0px;
	align-items:center;
`

export const PaymentStatusText = styled.Text`
	margin-left: ${relativeScreenDensity(20)}px;
	font-family: 'Arvo_400Regular';
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`
