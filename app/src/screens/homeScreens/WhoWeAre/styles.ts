import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { statusBarHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const ContainerContent = styled.View`

`

export const Header = styled.View`
	padding-top: ${statusBarHeight / 2}px;
	justify-content: space-between;
	width: 100%;
	height: 10%;
	background-color: ${({ theme }) => theme.white3};
	padding-horizontal: ${RFValue(12)}px;
`

export const Body = styled.View`
	width: 100%;
	height: 90%;
	background-color: ${({ theme }) => theme.orange2};
	padding-horizontal: ${RFValue(25)}px;
	padding-vertical:  ${RFValue(15)}px;
`

export const BoldPhrase = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(20)}px;
`
