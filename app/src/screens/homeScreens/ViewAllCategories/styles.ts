import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(12)}px;
	padding-bottom: 0px;
`

export const InputContainer = styled.View`
	margin-vertical: ${relativeScreenWidth(5)}px;
	height: ${RFValue(50)}px;
	padding-horizontal: ${relativeScreenWidth(2)}px;
	padding-vertical: ${relativeScreenWidth(2)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Body = styled.View`
	flex: 1;
	padding: ${RFValue(15)}px;
`

export const LastSigh = styled.View`
	width: 100%;
	height: ${relativeScreenHeight(10)}px;
`
