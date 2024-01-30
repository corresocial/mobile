import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const ContainerContent = styled.View`
	padding: ${RFValue(10)}px;
	align-items: flex-start;
	justify-content: center;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3.5)}px;
`

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.blue2};
	padding: ${relativeScreenWidth(4)}px ${relativeScreenWidth(7)}px;
`

export const Title = styled.Text`
	font-size: ${RFValue(30)}px;
	font-family: Arvo_700Bold;
`

export const Description = styled.Text`
	font-family: Arvo_400Regular;
	line-height: ${RFValue(20)}px;
	font-size: ${RFValue(18)}px;
`

export const ButtonContainer = styled.View`
	margin-vertical: ${relativeScreenHeight(2)}px;
	width: 100%;
`
