import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.blue2};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	height: 8%;
	background-color: ${({ theme }) => theme.white3};
	padding-horizontal: ${RFValue(12)}px;
`

export const Body = styled.View`
	width: 100%;
	height: 92%;
	background-color: ${({ theme }) => theme.orange2};
	padding-horizontal: ${RFValue(12)}px;
`

export const NewLinkButtonContainer = styled.View`
	width: 100%;
	height: ${screenHeight * 0.11}px;
	align-items: center;
	justify-content: center;
	padding-horizontal: ${RFValue(40)}px;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(10)}px;
`

export const LastSigh = styled.View`
	width: 100%;
	height: ${RFValue(80)}px;
`
