import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const ContainerContent = styled.View`
	height: ${relativeScreenHeight(30)}px;
	padding: ${RFValue(10)}px;
	align-items: flex-start;
	justify-content: center;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding-vertical: ${relativeScreenHeight(2)}px;
	padding-horizontal: ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.orange2};
	padding-horizontal: ${relativeScreenWidth(7)}px;
	padding-vertical:  ${relativeScreenWidth(4)}px;
`

export const BoldPhrase = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
`

export const Description = styled.Text`
	font-family: Arvo_400Regular;
	line-height: ${RFValue(20)}px;
	font-size: ${RFValue(16)}px;
`

export const ButtonContainer = styled.View`
	align-self: flex-end;
	margin-vertical: ${relativeScreenHeight(2)}px;
	width: 100%;
`
