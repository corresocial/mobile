import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.purple2};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	height: 28%;
	background-color: ${({ theme }) => theme.white3};
	padding-horizontal: ${RFValue(12)}px;
`

export const UserAndValueContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const OptionsArea = styled.View`
	padding-vertical: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Body = styled.View`
	width: 100%;
	height: 74%;
	background-color: ${({ theme }) => theme.purple2};
	padding: ${RFValue(12)}px;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(10)}px;
`

export const LastSigh = styled.View`
	width: 100%;
	height: ${RFValue(80)}px;
`
